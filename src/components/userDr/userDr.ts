import {Block} from "../../utils/block";
import store from "../../utils/store/store";
import {Button} from "../button";
import connect from "../../utils/store/connect";
import "./userDr.css"

interface User {
    name: string;
    login: string;
}

interface UsersDropdownProps {
    users: User[];
    onDeleteUser: (login: string) => void;
}


class UserItem extends Block {
    constructor(props: Indexed) {
        super({
            ButtonDelete: new Button({
                label: 'Удалить',
                onClick: () => {
                    store.set('ui.modalActive', {name: 'deleteUserFromChat', value: props.id});
                    console.log('store', store.getState());
                }
            }),
            ...props
        });
    }

    render(): string {
        return `
            <li class="users-dropdown-item">
              <span>{{login}}</span>
              {{{ButtonDelete}}}
            </li>`;
    }
}

class UsersDr extends Block {
    constructor(props: UsersDropdownProps) {
        super({
            UserItemsList: [],
            ...props
        });
    }

    render(): string {
        return `
      <div class="users-dropdown">
        <div class="users-dropdown-trigger">Пользователи</div>
        <ul class="users-dropdown-list">
          {{{UserItemsList}}}
        </ul>
      </div>
    `;
    }
}

function mapUserToProps(state: State):Indexed {
    return {
        chatUsers: state.chatUsers,
    };
}

const createItemCallback =  (prop:Indexed) => {
    return  new UserItem(prop);
}
const listUpdateProps = {
    key:'UserItemsList',
    createItemCallback,
}

function mapStateToListProps(state: Indexed):Indexed {
    return  state.chatUsers as Indexed;
}

export default connect(UsersDr, mapUserToProps, listUpdateProps, mapStateToListProps);

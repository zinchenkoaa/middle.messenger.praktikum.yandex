
import store from "./store";
import { StoreEvents } from "./store";
import { Block } from "../block";

interface BlockProps {
    [key: string]: unknown;
}

interface ListUpdateProps {
    key: string,
    createItemCallback: (item: Indexed) => Block
}

function connect(
    Component: typeof Block,
    mapStateToProps: (state: Indexed) => Indexed,
    listUpdateProps: ListUpdateProps | null = null,
    mapStateToListProps: ((state: Indexed) => Indexed) | null = null,
) {
    return class extends Component {
        constructor(props: BlockProps) {
            super({ ...props, ...mapStateToProps(store.getState() as Indexed) });

            store.on(StoreEvents.Updated, () => {
                const newProps = mapStateToProps(store.getState() as Indexed);
                this.setProps(newProps);
                if (listUpdateProps != null && mapStateToListProps != null) {
                    const listProps = mapStateToListProps(store.getState() as Indexed);
                    if (Array.isArray(listProps)) {
                        this.updateList(listUpdateProps.key, listProps, listUpdateProps.createItemCallback)
                    }

                }
            });
        }
    };
}

export default connect;

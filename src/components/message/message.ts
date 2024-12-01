import "./message.css";
import { Block } from "../../utils/block";

export class Message extends Block {
    private truncateMessage(text: string, maxLength: number, contM: boolean): string {
        if (contM && text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    }

    public render(): string {
        // Получаем свойства
        const { textMessage, contM = false } = this.props;

        // Обрезаем сообщение, если нужно
        const truncatedMessage = this.truncateMessage(textMessage, 20, contM);

        return `
<p class="{{ className }}">${truncatedMessage}</p>
`;
    }
}

import { useEffect } from "preact/hooks";

export interface Props {
    dataAccount: string;
}

export default function UserWay({ dataAccount }: Props) {
    return (
        <script
            src="https://cdn.userway.org/widget.js"
            data-account={`${dataAccount}`}
            data-color="#FF8461"
            data-language="pt"
        >
        </script>
    );
}

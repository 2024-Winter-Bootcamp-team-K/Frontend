export default class WebSocketService {
    private static instance: WebSocketService | null = null;
    private ws: WebSocket | null = null;
    private url: string = "";
    private onMessageCallback: ((data: any) => void) | null = null;

    private constructor() {}

    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    public connect(url: string, onMessage: (data: any) => void): void {
        if (this.ws) {
            console.warn("WebSocket already connected.");
            return;
        }

        this.url = url;
        this.onMessageCallback = onMessage;
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            console.log("WebSocket connection established:", this.url);
        };

        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("Message received from WebSocket:", data);
            if (this.onMessageCallback) {
                this.onMessageCallback(data);
            }
        };

        this.ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        this.ws.onclose = (event) => {
            console.log("WebSocket connection closed:", event.code, event.reason);
        };
    }

    public sendMessage(message: any): void {
        if (!this.ws) {
            console.error("WebSocket is not connected.");
            return;
        }
        this.ws.send(JSON.stringify(message));
        console.log("Message sent to WebSocket:", message);
    }

    public disconnect(): void {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
            console.log("WebSocket connection closed manually.");
        }
    }
}

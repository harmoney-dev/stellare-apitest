export class Helper {
    public static delay(milliseconds: any){
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }

    public static formatEndpoint(endpoint: string, replacements: { [key: string]: string }): string {
        let result = endpoint;
        for (const key in replacements) {
            const placeholder = `{${key}}`;
            const value = replacements[key];
            result = result.replace(placeholder, value);
        }
        return result;
    }

    public static  equalsIgnoreCase(str1: string, str2: string): boolean {
        return str1.toLowerCase() === str2.toLowerCase();
    }
}
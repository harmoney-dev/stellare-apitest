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

    public static getDateAfter(days: number) {
        const today = new Date();
        const afterDays = new Date(today);
        afterDays.setDate(today.getDate() + days);

        // Set the time to the last millisecond of the day
        afterDays.setHours(23, 59, 59, 999);

        // Format the date to ISO string
        return afterDays.toISOString();
    }

    public static getRandomEnumValue(anEnum: any): string {
        const enumKeys = Object.keys(anEnum);
        const randomKey = enumKeys[Math.floor(Math.random() * enumKeys.length)];
        return anEnum[randomKey];
    }
}
export class helper {
    public static delay(milliseconds: any){
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }
}
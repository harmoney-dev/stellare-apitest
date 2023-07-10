import {DataTable} from "@cucumber/cucumber";
import {NetworthSource} from "../../config/lib/networthSource";

export class Asset {
    static getAssets(taskId: string, table: DataTable) {
        const dataMap = table.raw();

        const keys = dataMap[0];
        const values = dataMap[1];

        const body = {
            taskId: taskId,
            assets: [] as any
        };

        keys.forEach((key: any, index: any) => {
            let asset: any;
            let networth = NetworthSource.getKeyId(key);
            if ( networth && values[index]) {
                asset = this.getAsset(networth, values[index]);
                body.assets.push(asset)
            }
        });

        return body;
    }

    private static getAsset(networth: number, value: any) {
        const [amount, info] = value.split('-');
        let payload: any = {
            networthSourceId: networth,
            declaredAmount: parseInt(amount),
        }
        if (info)   payload.assetName = info;

        return payload;
    }
}
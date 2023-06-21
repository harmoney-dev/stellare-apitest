import {DataTable, When} from "@cucumber/cucumber";
import {IDV} from "../../support/components/idv";
import {ConfigManager, endpoints, events} from "../../config";
import {IdvApplicant} from "../../support/payloads/idvApplicant";
import {IdvInit} from "../../support/payloads/idvInit";

let idv: IDV;

When('I start the user task idv-welcome', async function () {
    idv = new IDV(this.servers.stellare);
    const f1Token = await idv.connectToF1(this.userToken, this.userId, ConfigManager.country);
    idv = new IDV(this.servers.frankieOne);
    idv.f1Token = f1Token;
    const tokenValidation = await idv.tokenValidation();
    const f1SessionId = tokenValidation.body.sessionId;
    const customerId = tokenValidation.body.organisation.customerId;
    const initBody = IdvInit.getIdvInitPayload(customerId, this.userId, f1SessionId, ConfigManager.config.baseURL.frankieOne);
    await idv.initSmartUI(f1SessionId, customerId, events, initBody);
});

When('I submit the user task idv-frankie-smart-ui with details', async function (idvForm: DataTable) {
    const body = await IdvApplicant.getApplicantPayload(idv, this.userId, idvForm);
    this.response = await idv.submitApplicant(body);
    await idv.getApplicant(this.response.body.entityId, this.response.header.token);
    this.response = await idv.checkApplication(this.response.body.entityId);
});


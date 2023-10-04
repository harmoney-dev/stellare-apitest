import {DataTable, When} from "@cucumber/cucumber";
import {IDV} from "../../support/components/idv";
import {completeEvents, ConfigManager, initEvents} from "../../config";
import {IdvApplicant} from "../../support/payloads/idvApplicant";
import {IdvInit} from "../../support/payloads/idvInit";

let idv: IDV;
let f1SessionId = '';
let customerId = '';

// When('I start the user task idv-welcome', async function () {
When('I start the idv process', async function () {
    idv = new IDV(this.servers.stellare);
    const f1Token = await idv.connectToF1(this.userToken, this.userId, ConfigManager.country);
    idv = new IDV(this.servers.frankieOne);
    idv.f1Token = f1Token;
    const tokenValidation = await idv.tokenValidation();
    f1SessionId = tokenValidation.body.sessionId;
    customerId = tokenValidation.body.organisation.customerId;
    const initBody = IdvInit.getIdvInitPayload(customerId, this.userId, f1SessionId, ConfigManager.config.baseURL.frankieOne);
    await idv.initSmartUI(f1SessionId, customerId, initEvents, initBody);
});

When('I submit the IDV user info with details', async function (idvForm: DataTable) {
    const body = await IdvApplicant.getApplicantPayload(idv, this.userId, idvForm);
    this.response = await idv.submitApplicant(body);
    const entityId = this.response.body.entityId;
    await idv.getApplicant(entityId, this.response.header.token);
    this.response = await idv.checkApplication(this.response.body.entityId);
    await idv.completeEvent(f1SessionId, customerId, entityId, completeEvents);
});


import {DataTable} from "@cucumber/cucumber";
import {faker} from "@faker-js/faker";
import {IDV} from "../components/idv";

export class IdvApplicant {
    static async getApplicantPayload(idv: IDV, userId: string, data: DataTable) {
        const idvData = data.hashes()[0];
        const firstName = idvData["firstName"] === 'faker' ? faker.person.firstName() : idvData["firstName"];
        const lastName = idvData["lastName"] === 'faker' ? faker.person.lastName() : idvData["lastName"];
        const idNumber = idvData["driverLicence"] === 'faker' ? faker.helpers.rangeToNumber({ min: 10000000, max: 99999999 }).toString() : idvData["driverLicence"];
        const docNumber = idvData["docNumber"] === 'faker' ? faker.helpers.rangeToNumber({ min: 1000000000, max: 9999999999 }).toString() : idvData["docNumber"];
        const dob = idvData["DOB"] === 'faker' ? faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0] : idvData["DOB"];
        const searchResult = await idv.getAddress(idvData["address"]);
        const addressValue = searchResult.body[0].value;
        const form = (await idv.getFormAddress(searchResult.headers.token, addressValue)).body;

        return {
            applicant:
                {
                    entityId: null,
                    customerReference: userId,
                    name:
                        {
                            givenName: firstName,
                            middleName: "passall",
                            familyName: lastName,
                            displayName: null
                        },
                    dateOfBirth: dob,
                    gender: null,
                    extraData:
                        {},
                    phoneNumber:
                        {
                            documentId: null,
                            idNumber: null
                        },
                    addresses:
                        [
                            {
                                buildingName: form.buildingName,
                                postalCode: form.postalCode,
                                state: form.state,
                                streetNumber: form.streetNumber,
                                streetType: form.streetType,
                                suburb: form.suburb,
                                town: form.town,
                                unitNumber: form.unitNumber,
                                addressType: form.addressType,
                                country: form.country,
                                addressId: form.addressId,
                                data:
                                    {
                                        longForm: form.data.longForm
                                    },
                                isAddedByCustomer: form.isAddedByCustomer,
                                streetName: form.streetName,
                                longForm: form.longForm
                            }
                        ],
                    email:
                        {
                            documentId: null,
                            idNumber: null
                        },
                    profile:
                        {
                            profileType: "auto",
                            kycMethod: "electronic",
                            countryAlpha3: "aus",
                            dob: null,
                            checkTypes:
                                []
                        },
                    assignee: null,
                    consents:
                        [
                            "general",
                            "docs",
                            "creditheader"
                        ],
                    blocklistAttributes: null,
                    originalUboDetails: null
                },
            documents:
                [
                    {
                        dateOfBirth: null,
                        idSubType: null,
                        docScan:
                            [],
                        scans:
                            [],
                        documentId: null,
                        verified:
                            {
                                electronic: null,
                                manual: null
                            },
                        region: form.state,
                        country: "AUS",
                        idNumber: idNumber,
                        gender: null,
                        extraData: {
                            "widget-index": 0,
                            digital_licence: false,
                            document_number: docNumber
                        },
                        validation:
                            {
                                manual:
                                    {
                                        isValid: null
                                    },
                                electronic:
                                    {
                                        validationReport: null,
                                        isValid: null
                                    }
                            },
                        idType: "DRIVERS_LICENCE",
                        idExpiry: null,
                        ocrResult:
                            {}
                    }
                ],
            supportingDocuments:
                [],
            kycMethod: "electronic",
            consent: true
        }
    }
} 
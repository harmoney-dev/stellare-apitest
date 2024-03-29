import {DataTable} from "@cucumber/cucumber";
import {faker} from "@faker-js/faker";
import {IDV} from "../components/idv";
import {Helper} from "../../utils/helper";

export class IdvApplicant {
    static async getApplicantPayload(idv: IDV, userId: string, data: DataTable) {
        const idvData = data.hashes()[0];
        const firstName = idvData["firstName"] === 'faker' ? faker.person.firstName() + getRandomAlphabets() : idvData["firstName"];
        const lastName = idvData["lastName"] === 'faker' ? faker.person.lastName() + getRandomAlphabets() : idvData["lastName"];
        const idNumber = idvData["driverLicence"] === 'faker' ? faker.helpers.rangeToNumber({ min: 10000000, max: 99999999 }).toString() : idvData["driverLicence"];
        const docNumber = idvData["docNumber"] === 'faker' ? faker.helpers.rangeToNumber({ min: 1000000000, max: 9999999999 }).toString() : idvData["docNumber"];
        const dob = idvData["DOB"] === 'faker' ? faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0] : idvData["DOB"];
        const address = idvData["address"] === 'faker' ? faker.helpers.rangeToNumber({ min: 1, max: 200 }).toString() : idvData["address"];
        const searchResult = await idv.getAddress(address);
        const addressValue = searchResult.body[0].value;
        const form = (await idv.getFormAddress(searchResult.headers.token, addressValue)).body;
        let idExpiryDate = null;
        if (idvData["idType"].toUpperCase() === 'PASSPORT') {
            idExpiryDate = Helper.getDateAfter(365).split('T')[0];
        }

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
                            profileType: "safe_harbour_id_nodup",
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
                            digital_licence: null,
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
                        idType: idvData["idType"].toString().toUpperCase().replace(' ', '_'),
                        idExpiry: idExpiryDate,
                        ocrResult:
                            {}
                    }
                ],
            supportingDocuments:
                [],
            kycMethod: "electronic",
            consent: true
        }

        function getRandomAlphabets(): string {
            const alphabet = 'abcdefghijklmnopqrstuvwxyz';
            let result = '';

            for (let i = 0; i < 6; i++) {
                const randomIndex = Math.floor(Math.random() * alphabet.length);
                result += alphabet[randomIndex];
            }

            return result;
        }
    }
} 
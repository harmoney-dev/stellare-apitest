export class IdvInit {
    static getIdvInitPayload(customerId: string, userId: string, session: string, url: string) {
        return {
            name: "INIT",
            timeStamp: (new Date()).toISOString(),
            data:
                {
                    organisation:
                        {
                            id: 264,
                            parentId: null,
                            customerId: customerId,
                            customerChildId: null,
                            name: "Harmoney",
                            nickName: "hmoney",
                            isRoot: false,
                            timezone: "Australia/Melbourne"
                        },
                    isMachineToken: true,
                    referrer: null,
                    permissions:
                        [
                            "create::applicant",
                            `update::applicant:reference:${userId}`,
                            `view::applicant:reference:${userId}`,
                            `list::applicant:reference:${userId}`,
                            "ffportal_trigger_external_idv",
                            "ffportal_applicant_midv_upload",
                            "ffportal_applicant_manual_kyc_update",
                            "list::address",
                            "create::event"
                        ],
                    sessionId: session,
                    environment: url,
                    reference: userId,
                    applicantReference: userId,
                    configuration:
                        {
                            mode: "production",
                            documentTypes:
                                [
                                    {
                                        icon: "driving-licence",
                                        label: "document.type_drivers_licence.label",
                                        subtitle: "document.type_drivers_licence.subtitle",
                                        type: "DRIVERS_LICENCE"
                                    },
                                    {
                                        idExpiry: true,
                                        icon: "passport",
                                        label: "document.type_passport.label",
                                        subtitle: "",
                                        type: "PASSPORT",
                                        acceptedCountries:
                                            [
                                                "AUS"
                                            ]
                                    },
                                    {
                                        icon: "medicare",
                                        label: "document.type_medicare.label",
                                        subtitle: "",
                                        type: "NATIONAL_HEALTH_ID"
                                    }
                                ],
                            welcomeScreen: false,
                            maxAttemptCount: 3,
                            successScreen:
                                {
                                    ctaUrl: null,
                                    ctaText: "Continue to My Account"
                                },
                            failureScreen:
                                {
                                    ctaUrl: null,
                                    ctaText: "Contact Us"
                                },
                            progressBar: false,
                            checkProfile: "auto",
                            googleAPIKey: "AIzaSyCypGiHWEMyvlmuQyO0kzOmwDehIBGSk_A",
                            acceptedCountries:
                                [
                                    "AUS"
                                ],
                            frankieBackendUrl: url,
                            ageRange:
                                [
                                    18,
                                    125
                                ],
                            organisationName: "Organisation",
                            dateOfBirth:
                                {
                                    type: "gregorian"
                                },
                            idScanVerification: false,
                            pendingScreen:
                                {
                                    htmlContent: null,
                                    ctaActions:
                                        []
                                },
                            consentText: "I agree with the terms described in the Consent section of the Company's webpage",
                            requestAddress:
                                {
                                    acceptedCountries:
                                        [
                                            "AUS"
                                        ]
                                },
                            documentUploads: false,
                            lazyIDCheck: false,
                            requestID: true,
                            phrases:
                                {
                                    common:
                                        {
                                            next_button_cta: "Continue",
                                            confirm_button_cta: "Yes, that's correct",
                                            save_button_cta: "Save",
                                            edit_button_cta: "Edit",
                                            cancel_button_cta: "Cancel",
                                            mandatory_field: "*"
                                        },
                                    applicant:
                                        {
                                            name: "Name",
                                            english_name: "English Name",
                                            native_name: "Native Name",
                                            date_of_birth: "Date of Birth",
                                            date_of_birth_buddhist: "Buddhist Date of Birth",
                                            current_address: "Current Residential Address",
                                            previous_address: "Previous Residential Address",
                                            gender: "Gender",
                                            marital_status: "Marital status"
                                        },
                                    document:
                                        {
                                            number: "Number",
                                            type_passport:
                                                {
                                                    label: "Passport",
                                                    subtitle: "",
                                                    number: "Document Number",
                                                    country: "Country of Issue",
                                                    expiry: "Expiry Date"
                                                },
                                            type_drivers_licence:
                                                {
                                                    label: "Drivers Licence",
                                                    subtitle: "(recommended)",
                                                    state: "State or territory of issue",
                                                    licence_number: "Licence Number",
                                                    card_number: "Card Number",
                                                    digital_consent: "This is a digital licence and I don’t have my physical licence with me.",
                                                    digital_notification_banner: "A physical licence is required to open an account. You may complete the application however you may need to provide additional information."
                                                },
                                            type_medicare:
                                                {
                                                    label: "Medicare Card",
                                                    subtitle: "",
                                                    number: "Number",
                                                    colour: "Colour",
                                                    position: "Position",
                                                    expiry: "Expiry Date",
                                                    name: "Name as shown on card"
                                                },
                                            type_national_id:
                                                {
                                                    label: "National Id",
                                                    subtitle: "(Citizen/Permanent resident)",
                                                    laser_code: "Laser Code",
                                                    country: "Country of Citizenship",
                                                    identification_number: "Identification Number",
                                                    name: "Name as shown on card",
                                                    nationality: "Nationality"
                                                }
                                        },
                                    document_select:
                                        {
                                            title: "Let's verify your identity",
                                            title_extra: "Looks like you need to try a different ID",
                                            subtitle: "Before we proceed, we have to confirm you are you.",
                                            hint_message: "Choose which ID you'd like to provide.",
                                            footer_text: "Your ID must be valid and not expired"
                                        },
                                    document_uploads:
                                        {
                                            title: "Upload your document",
                                            guide_text: "Please choose and upload one of the following documents to complete your verification.",
                                            select_placeholder: "Select document type",
                                            upload_cta: "Upload",
                                            upload_success: "Successfully uploaded",
                                            generic_error: "There was a problem uploading your file",
                                            summary_title: "Documents uploaded",
                                            unsupported_file_type: "Uploaded file is of invalid type"
                                        },
                                    name_input_screen:
                                        {
                                            title: "What is your full name?",
                                            dual_name_english_title: "Your English name",
                                            dual_name_native_title: "Your Native name",
                                            title_loop: "Check your name",
                                            dual_name_english_title_loop: "Check your English name",
                                            dual_name_native_title_loop: "Check your Native name",
                                            subtitle: "What is your full legal name as it is shown exactly on your ID.",
                                            honorific_title_label: "Title",
                                            given_name_label: "Given Name",
                                            given_name_confirmation_label: "(as shown on ID)",
                                            middle_name_label: "Middle Name or Initial",
                                            middle_name_confirmation_label: "(only include if shown on ID)",
                                            family_name_label: "Surname",
                                            family_name_confirmation_label: "(as shown on ID)",
                                            medicare_middle_name_label: "How is your middle name displayed on your Medicare Card?"
                                        },
                                    passport_input_screen:
                                        {
                                            title: "Your passport details",
                                            title_loop: "Check your passport details",
                                            expiry_date_placeholder: "DD/MM/YYYY"
                                        },
                                    current_address_screen:
                                        {
                                            title: "Where do you live?",
                                            title_loop: "Check your current residential address"
                                        },
                                    previous_address_screen:
                                        {
                                            title_first_time: "What is your previous residential address?",
                                            title: "Your previous residential address",
                                            title_loop: "Check your current residential address",
                                            question_has_previous_address: "Have you been at your address for less than 6 months?"
                                        },
                                    date_of_birth_input_screen:
                                        {
                                            title: "What is your date of birth?",
                                            title_loop: "Check your Date of Birth",
                                            full_date_label: "Day / Month / Year",
                                            full_date_label_buddhist: "Day / Month / Year (Day and month are optional)",
                                            day_label: "DD",
                                            month_label: "MM",
                                            year_label: "YYYY",
                                            message_label: "Your birthday is the {0}, making you {1} years old",
                                            minimum_age_error_label: "You must be over {0} years old to open an account",
                                            error_message_label: "Oops, looks like there might have been a mistake, try again",
                                            buddhist: "Buddhist",
                                            gregorian: "Gregorian"
                                        },
                                    medicare_input_screen:
                                        {
                                            title: "Your medicare card details",
                                            title_loop: "Check your medicare card details"
                                        },
                                    drivers_licence_input_screen:
                                        {
                                            title: "What are your driver’s licence details?",
                                            title_loop: "Check your driver's licence details",
                                            state_screen_title: "Where was your driver's licence issued?",
                                            document_number_info_label: "You will find your Card Number ",
                                            doc_number_hint_ACT: "on the front of your card, running vertically alongside your photo.",
                                            doc_number_hint_NSW: "on the front of your card, in the top right corner above your photo.",
                                            doc_number_hint_SA: "on the back of your card, in the top right corner.",
                                            doc_number_hint_TAS: "on the back of your card, in the top right corner.",
                                            doc_number_hint_WA: "on the back of your card, in the middle of the right side.",
                                            doc_number_hint_NT: "on the back of your card, either in the bottom left corner or bottom middle.",
                                            doc_number_hint_QLD: "either on the front of your card, in the bottom middle, or the back of your card, on the bottom right side.",
                                            doc_number_hint_VIC: "on the back of your card, either in the top right corner or middle right."
                                        },
                                    national_id_input_screen:
                                        {
                                            title: "Your National Id details",
                                            title_loop: "Check your National Id details"
                                        },
                                    address_manual_input_screen:
                                        {
                                            unit_label: "Unit Number",
                                            street_number_label: "Street Number",
                                            street_name_label: "Street Name",
                                            country_placeholder: "Country",
                                            suburb_label: "Suburb",
                                            town_label: "Suburb/Town",
                                            state_label: "State",
                                            postcode_label: "Postcode",
                                            country_label: "Country",
                                            full_address_label: "Full address",
                                            unit_placeholder: "Unit",
                                            street_number_placeholder: "Street Number",
                                            street_name_placeholder: "Street Name",
                                            suburb_placeholder: "Suburb",
                                            town_placeholder: "Suburb/Town",
                                            state_placeholder: "State",
                                            postcode_placeholder: "Postcode",
                                            full_address_placeholder: "Full address"
                                        },
                                    address_autocomplete_input_screen:
                                        {
                                            switch_to_manual: "Enter address manually",
                                            autocomplete_label: "Cannot be a PO Box",
                                            autocomplete_placeholder: "Start typing your address...",
                                            autocomplete_no_match_message: "No results found. Click here to add address manually."
                                        },
                                    review_details_screen:
                                        {
                                            title: "Take a moment to check your details",
                                            personal_info_label: "Your personal info",
                                            submit_button_idle: "Verifying",
                                            submit_button_cta: "Verify my ID",
                                            edit_title_name: "Edit your name",
                                            edit_title_dual_name_english: "Edit your English name",
                                            edit_title_dual_name_native: "Edit your Native name",
                                            edit_title_dob: "Edit your date of birth",
                                            edit_title_current_address: "Edit your current residential address",
                                            edit_title_previous_address: "Edit your previous residential address",
                                            edit_title_passport: "Edit your Passport details",
                                            edit_title_drivers_licence: "Edit your Driver's Licence details",
                                            edit_title_national_health_id: "Edit your Medicare details",
                                            edit_title_national_id: "Edit your National Id details",
                                            loading_verification: "&lt;h1>Verifying your identity...&lt;/h1>&lt;p>Please do not close or refresh this page.&lt;/p>"
                                        },
                                    success_screen:
                                        {
                                            title: "ID successfully verified",
                                            title_credit_header: "Your identity has been verified",
                                            subtitle: "Your identity has been successfully verified.",
                                            credit_header_title: "Please Note:",
                                            credit_header_description_p_1: "The details you provided didn’t match the records held on file by one or all of the credit reporting agencies we checked (Illion, Equifax and/or Experian).",
                                            credit_header_description_p_2: "Don’t worry, this doesn’t mark or affect credit history in any way. However this could be why we’ve had trouble verifying your identity.",
                                            credit_header_description_p_3: "There is nothing you need to do, however if you’d like more information please feel free to get in touch with our customer service team."
                                        },
                                    failure_screen:
                                        {
                                            title: "Oh no!",
                                            subtitle: "Unfortunately we couldn't verify your identity at this time.",
                                            failure_hint: "Please contact our customer support team who will be happy to help you open your account.",
                                            credit_header_title: "Please Note:",
                                            credit_header_description_p_1: "The details you provided didn’t match the records held on file by one or all of the credit reporting agencies we checked (Illion, Equifax and/or Experian).",
                                            credit_header_description_p_2: "Don’t worry, this doesn’t mark or affect credit history in any way. However this could be why we’ve had trouble verifying your identity.",
                                            credit_header_description_p_3: "There is nothing you need to do, however if you’d like more information please feel free to get in touch with our customer service team."
                                        },
                                    pending_screen:
                                        {
                                            title: "Sit Tight...",
                                            innner_p_1: "There are still a couple of things we need to check before opening your account.",
                                            innner_p_2: "We’ll let you know once it’s complete.",
                                            credit_header_title: "Please Note:",
                                            credit_header_description_p_1: "The details you provided didn’t match the records held on file by one or all of the credit reporting agencies we checked (Illion, Equifax and/or Experian).",
                                            credit_header_description_p_2: "Don’t worry, this doesn’t mark or affect credit history in any way. However this could be why we’ve had trouble verifying your identity.",
                                            credit_header_description_p_3: "There is nothing you need to do, however if you’d like more information please feel free to get in touch with our customer service team."
                                        },
                                    partial_match_screen:
                                        {
                                            title: "We couldn’t verify your identity",
                                            subtitle: " Most of the time it’s just a typo, let’s check your details have been entered correctly.",
                                            credit_header_title: "Please Note:",
                                            credit_header_description_p_1: "The details you provided didn’t match the records held on file by one or all of the credit reporting agencies we checked (Illion, Equifax and/or Experian).",
                                            credit_header_description_p_2: "Don’t worry, this doesn’t mark or affect credit history in any way. However this could be why we’ve had trouble verifying your identity.",
                                            credit_header_description_p_3: "There is nothing you need to do, however if you’d like more information please feel free to get in touch with our customer service team.",
                                            cta_text: "Check your ID information"
                                        },
                                    no_match_screen:
                                        {
                                            title: "We’re having trouble verifying your identity",
                                            subtitle: " Most of the time it’s just a typo, let’s check your details have been entered correctly.",
                                            credit_header_title: "Please Note:",
                                            credit_header_description_p_1: "The details you provided didn’t match the records held on file by one or all of the credit reporting agencies we checked (Illion, Equifax and/or Experian).",
                                            credit_header_description_p_2: "Don’t worry, this doesn’t mark or affect credit history in any way. However this could be why we’ve had trouble verifying your identity.",
                                            credit_header_description_p_3: "There is nothing you need to do, however if you’d like more information please feel free to get in touch with our customer service team."
                                        },
                                    credit_header_failure_screen:
                                        {
                                            title: "Welcome! Just a few things before we start",
                                            credit_header_description_p_1: "The details you provided didn’t match the records held on file by one or all of the credit reporting agencies we checked (Illion, Equifax and/or Experian).",
                                            credit_header_description_p_2: "Don’t worry, this doesn’t mark or affect credit history in any way. However this could be why we’ve had trouble verifying your identity.",
                                            credit_header_description_p_3: "Please contact our customer support team who will be happy to help.",
                                            cta_text: "Proceed"
                                        },
                                    unauthorize_error_screen:
                                        {
                                            title: "This link has expired.",
                                            sub_titlte_p_1: "You will need to get a new link to proceed.",
                                            sub_titlte_p_2: "Links last 2 hours."
                                        },
                                    error_label:
                                        {
                                            missing: "{fieldName} is required",
                                            invalid: "{fieldName} is invalid",
                                            incomplete: "{fieldName} is incomplete",
                                            expired: "{documentName} is expired"
                                        },
                                    errors:
                                        {
                                            400:
                                                {
                                                    text: "Token is not authorised",
                                                    explanation: "Please re-initialise with a different token"
                                                },
                                            default:
                                                {
                                                    text: "Something went wrong.",
                                                    explanation: "Please try refreshing or contact our support team.",
                                                    cta: "Refresh",
                                                    url: ""
                                                },
                                            '1023 - 404':
                                                {
                                                    text: "Can't retrieve original document",
                                                    explanation: "Contact help desk"
                                                }
                                        }
                                },
                            disableThirdPartyAnalytics: false,
                            injectedCss: "\n  #ff-onboarding-widget,\n  #ff-onboarding-widget .ff-review-input .ff-form {\n    background-color: transparent !important;\n  }\n\n  #ff-onboarding-widget .ff-title {\n    font-family: var(--font-family-heading) !important;\n    font-size: var(--font-size-h4) !important;\n    font-weight: 700 !important;\n    color: var(--colour-brand-primary) !important;\n    min-height: 0 !important;\n    margin: 0 !important;\n  }\n\n  #ff-onboarding-widget .ff-outcome-message .ff-title {\n    font-family: var(--font-family-body) !important;\n    font-size: var(--font-size-base) !important;\n    font-weight: 500 !important;\n    color: var(--colour-grey-5) !important;\n  }\n\n  #ff-onboarding-widget, \n  #ff-onboarding-widget p,\n  #ff-onboarding-widget div,\n  #ff-onboarding-widget input,\n  #ff-onboarding-widget textarea,\n  #ff-onboarding-widget select,\n  #ff-onboarding-widget .ff-text-link {\n    font-family: var(--font-family-body) !important;\n    font-size: var(--font-size-base) !important;\n    font-weight: 400 !important;\n    color: var(--colour-grey-5) !important;\n  }\n\n  #ff-onboarding-widget .ff-text-link {\n    color: var(--colour-brand-secondary) !important;\n    margin-top: var(--spacing-2) !important;\n  }\n  #ff-onboarding-widget .ff-text-link:hover {\n    color: var(--colour-brand-secondary-darker-1) !important;\n  }\n\n  #ff-onboarding-widget .ff-main-label {\n    font-weight: 500 !important;\n  }\n\n  #ff-onboarding-widget .ff-hint-label,\n  #ff-onboarding-widget .helper-text .icon-outline,\n  #ff-onboarding-widget .helper-text .document-number-info-text {\n    display: none !important;\n  }\n\n  #ff-onboarding-widget .ff-form,\n  #ff-onboarding-widget .ff-form .vs__selected-options,\n  #ff-onboarding-widget .ff-form .vs__selected, \n  #ff-onboarding-widget .ff-form .vs__search,\n  #ff-onboarding-widget .ff-form .ff-stack,\n  #ff-onboarding-widget .ff-form .ff-scrollable,\n  #ff-onboarding-widget .ff-form .ff-stack .ff-document-type {\n    padding: 0 !important;\n    margin: 0 !important;\n  }\n\n  #ff-onboarding-widget .ff-native-select-icon {\n    top: 46px !important;\n  }\n\n  #ff-onboarding-widget .ff-dob-input {\n    margin-top: -48px !important;\n    margin-bottom: var(--spacing-12) !important;\n  }\n  \n  #ff-onboarding-widget .ff-drivers-licence-input {\n    margin-top: var(--spacing-6) !important;\n  }\n\n  #ff-onboarding-widget .ff-review-input .ff-document-review-input:last-child {\n    margin-bottom: 0 !important;\n  }\n\n  #ff-onboarding-widget .ff-form .ff-feedback,\n  #ff-onboarding-widget .ff-form .ff-text-link {\n    margin-top: var(--spacing-2) !important;\n  }\n  \n  #ff-onboarding-widget .ff-form .ff-review-summary {\n    background-color: var(--colour-white) !important;\n  }\n  #ff-onboarding-widget .ff-form .ff-summary-card .ff-review-title {\n    font-weight: 500 !important;\n  }\n  #ff-onboarding-widget .ff-form .ff-summary-card .ff-review-label {\n    color: var(--colour-grey-3) !important;\n  }\n\n  #ff-onboarding-widget .ff-consent-input .ff-the-tick {\n    border: 1px solid var(--colour-grey-3) !important;\n    border-radius: var(--border-radius-default) !important;\n  }\n  #ff-onboarding-widget .ff-consent-input .ff-the-tick:hover {\n    border-color: var(--colour-brand-tertiary) !important;\n  }\n  #ff-onboarding-widget .ff-consent-input .checked .ff-the-tick {\n    border-color: var(--colour-brand-tertiary) !important;\n  }\n  #ff-onboarding-widget .ff-consent-input .checked .ff-the-tick .ff-icon {\n    border-radius: var(--border-radius-default) !important;\n    background-color: var(--colour-brand-tertiary) !important;\n  }\n\n  #ff-onboarding-widget .ff-details-review .bottom-drawer .ff-dialog-content {\n    bottom: 80px !important;\n  }\n\n  #ff-onboarding-widget .ff-button-wrapper,\n  #ff-onboarding-widget .ff-buttton-wrapper {\n    margin: var(--spacing-6) 0 !important;\n    padding: 0 !important;\n    box-shadow: none !important;\n    background: transparent !important;\n  }\n\n  #ff-onboarding-widget .ff-basic-button {\n    padding: 0.875rem var(--spacing-6) !important;\n    border-radius: var(--border-radius-pill) !important;\n    border: 2px solid transparent !important;\n    background-color: var(--colour-brand-primary) !important;\n    color: var(--colour-white) !important;\n    font-family: var(--font-family-mono) !important;\n    font-size: var(--font-size-base) !important;\n    font-weight: 500 !important;\n    text-transform: uppercase !important;\n    letter-spacing: 0.16em !important;\n    cursor: pointer !important;\n    text-decoration: none !important;\n    box-shadow: none !important;\n    transition: all 0.2s ease-in-out !important;\n  }\n  #ff-onboarding-widget .ff-basic-button:hover {\n    background-color: var(--colour-brand-primary-darker-1) !important;\n    box-shadow: 0px 4px 12px rgb(178 178 178 / 70%) !important;\n  }\n  #ff-onboarding-widget .ff-basic-button:active,\n  #ff-onboarding-widget .ff-basic-button:focus-visible {\n    background-color: var(--colour-brand-primary-darker-2) !important;\n  }\n\n  #ff-onboarding-widget .ff-review-buttons .ff-cancel {\n    border: 2px solid var(--colour-brand-secondary) !important;\n    color: var(--colour-brand-secondary) !important;\n    background: var(--colour-white) !important;\n  }\n  #ff-onboarding-widget .ff-review-buttons .ff-cancel:hover {\n    background: var(--colour-secondary-lighter-3) !important;\n  }\n  #ff-onboarding-widget .ff-review-buttons .ff-cancel:active,\n  #ff-onboarding-widget .ff-review-buttons .ff-cancel:focus-visible {\n    background: var(--colour-secondary-lighter-2) !important;\n  }\n\n  #ff-onboarding-widget .ff-review-buttons .ff-basic-button {\n    width: 45% !important;\n  }\n\n  #ff-onboarding-widget .ff-document-type-button {\n    border: 1px solid var(--colour-grey-3) !important;\n    background: var(--colour-white) !important;\n    border-radius: var(--border-radius-lg) !important;\n  }\n  #ff-onboarding-widget .ff-document-type-button:hover {\n    border-color: var(--colour-brand-secondary) !important;\n    background: var(--colour-brand-secondary-lighter-3) !important;\n  }\n\n  @media (min-width: 480px) { \n    #ff-onboarding-widget .ff-basic-button {\n      width: fit-content !important;\n      margin: 0 auto !important;\n    }\n\n    #ff-onboarding-widget .ff-review-buttons .ff-basic-button {\n      width: 30% !important;\n    }\n  }\n",
                            saveOnly: false,
                            injectedCssTagID: null,
                            enableDeviceCharacteristics: false
                        }
                },
            customerId: customerId,
            sessionId: session,
            channel: "smart-ui",
            version: "v4.11.1",
            deviceType: "mobile",
            browser: "chrome"
        };
    }
}
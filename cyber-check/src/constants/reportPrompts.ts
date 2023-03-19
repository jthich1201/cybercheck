export const ReportPrompts = {
    "identify": {
        "preprompts": {
            "question": "1) Who has access to the network?",
            "options": [
                {
                    "option": "All employees and contractors",
                    "next_question": {
                        "question": "2) Are all network devices accounted for?",
                        "options": [
                            {
                                "option": "Yes, all devices are accounted for",
                                "next_question": {
                                    "question": "3) Are any devices using default credentials?",
                                    "options": [
                                        {
                                            "option": "No, no devices are using default credentials",
                                            "next_question": {
                                                "question": "4) Is software and firmware up to date?",
                                                "options": [
                                                    {
                                                        "option": "Yes, all devices are up to date",
                                                        "result": "The network is secure and up to date."
                                                    },
                                                    {
                                                        "option": "Most devices are up to date",
                                                        "result": "Update the devices that are out of date to ensure network security."
                                                    },
                                                    {
                                                        "option": "Some devices are out of date",
                                                        "result": "Update all devices to ensure network security."
                                                    },
                                                    {
                                                        "option": "Many devices are out of date",
                                                        "result": "Urgently update all devices to ensure network security."
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "option": "A few devices are using default credentials",
                                            "next_question": {
                                                "question": "4) Is software and firmware up to date?",
                                                "options": [
                                                    {
                                                        "option": "Yes, all devices are up to date",
                                                        "result": "The network is secure but update the devices that are out of date."
                                                    },
                                                    {
                                                        "option": "Most devices are up to date",
                                                        "result": "Update the devices that are out of date and review access controls."
                                                    },
                                                    {
                                                        "option": "Some devices are out of date",
                                                        "result": "Update all devices and review access controls."
                                                    },
                                                    {
                                                        "option": "Many devices are out of date",
                                                        "result": "Urgently update all devices and review access controls."
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "option": "Several devices are using default credentials",
                                            "next_question": {
                                                "question": "4) Is software and firmware up to date?",
                                                "options": [
                                                    {
                                                        "option": "Yes, all devices are up to date",
                                                        "result": "Update the devices using default credentials and review access controls."
                                                    },
                                                    {
                                                        "option": "Most devices are up to date",
                                                        "result": "Update the devices using default credentials, update the devices that are out of date, and review access controls."
                                                    },
                                                    {
                                                        "option": "Some devices are out of date",
                                                        "result": "Update all devices, change default credentials, and review access controls."
                                                    },
                                                    {
                                                        "option": "Many devices are out of date",
                                                        "result": "Urgently update all devices, change default credentials, and review access controls."
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "option": "Many devices are using default credentials",
                                            "next_question": {
                                                "question": "4) Is software and firmware up to date?",
                                                "options": [
                                                    {
                                                        "option": "Yes, all devices are up to date",
                                                        "result": "Urgently update the devices using default credentials and review access controls."
                                                    },
                                                    {
                                                        "option": "Most devices are up to date",
                                                        "result": "Urgently update the devices using default credentials, update the devices that are out of date, and review access controls."
                                                    },
                                                    {
                                                        "option": "Some devices are out of date",
                                                        "result": "Update all devices, change default credentials, and review access controls."
                                                    },
                                                    {
                                                        "option": "Many devices are out of date",
                                                        "result": "Urgently update all devices, change default credentials, and review access controls."
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        }
    },

    "incidentReponse":
        [
            {
                "incidentType": "Phishing",
                "incidentDetails": "sensitive information has been compromised (through clicking a link or downloading an attachment sent in a message or email)",
                "prompts": [
                    {
                        id: 1,
                        text: "Change any affected passwords - If possible, immediately change the password for any affected accounts.  If this password was also used for other online accounts, change the passwords for those accounts to something unique and strong."
                    },
                    {
                        id: 2,
                        text: "Contact the fraud department of the breached account - If the phishing attack compromised your company's account at a financial institution, contact the bank immediately to report the incident.  Monitor for unauthorized transactions to the account.  If a personal account was involved, contact the 3 major credit bureaus to enable fraud alerts."
                    },
                    {
                        id: 3,
                        text: "Notify appropriate people in your company - follow your company's incident response plan to ensure the appropriate personnel are aware of the incident."
                    },
                    {
                        id: 4,
                        text: "Notify affected parties - if personal data of others (e.g., customers, suppliers) was compromised, be sure to notify them.  The compromised personal data could be used for identity theft.  Check the website of your state's attorney general for information on data breach notification requirements."
                    },
                    {
                        id: 5,
                        text: "Deploy and maintain anti-virus software - if the phishing attack aims to install malware on your computer, up-to-date anti-virus software may help prevent the malware from installing."
                    },
                    {
                        id: 6,
                        text: "Utilize email filters - many email services have configurable filters which can help prevent many phishing messages from ever reaching users' mailboxes."
                    },
                    {
                        id: 7,
                        text: "Configure email security technologies - email services can also implement email authentication technologies that verify where messages originated and can reject messages that are spoofed.  Check with your provider to see what security options are available."
                    },
                    {
                        id: 8,
                        text: "Enable anti-phishing capabilities - email clients and web browsers often have anti-phishing capabilities. Enable available capabilities to help protect against phishing attacks."
                    },
                    {
                        id: 9,
                        text: "Implement multi-factor authentication (MFA) - MFA requires an additional forms of authentication (e.g., a code texted to your phone number) in addition to your password.  If MFA is enabled for your accounts, an attacker may still not be able to access your account even if you are tricked into providing your password."
                    }
                ]

            },

            {
                "incidentType": "Malware",
                "incidentDetails": "includes viruses, worms, trojans, ransomware, and spyware",
                "prompts": [
                    { id: 1, text: "Isolate infected devices or systems to prevent further spread of the malware." },
                    { id: 2, text: "Determine the type and extent of the malware infection." },
                    { id: 3, text: "Collect evidence and maintain chain of custody procedures to preserve evidence for potential legal action." },
                    { id: 4, text: "Determine the scope of the malware infection and identify all affected devices and systems." },
                    { id: 5, text: "Develop a plan to contain and eradicate the malware from affected devices and systems." },
                    { id: 6, text: "Implement malware removal procedures, including software updates, patching, and scans to remove the malware." },
                    { id: 7, text: "Verify that the malware has been removed and confirm that the system is functioning properly." },
                    { id: 8, text: "Restore data from backups as necessary." }
                ]
            },

            {
                "incidentType": "DDoS",
                "incidentDetails": "multiple compromised systems are being used to flood system with traffic, preventing legitimate user access",
                "prompts": [
                    {
                        id: 1,
                        text: "Analyze traffic to determine the scope and severity of the attack. This includes identifying the type of attack, the source of the attack, and the target(s) of the attack."
                    },
                    {
                        id: 2,
                        text: "Implement measures to contain the attack and limit its impact on your network. This may involve filtering or blocking traffic from the source of the attack, rerouting traffic to mitigate the impact on targeted systems, or deploying additional resources to handle the increased traffic load.",
                    },
                    {
                        id: 3,
                        text: "Once the attack has been contained, eliminate the root cause of the attack. This may involve patching vulnerabilities in systems or software, or deploying additional security controls to prevent future attacks."
                    },
                    {
                        id: 4,
                        text: "Restore normal operations as quickly as possible. This may involve restoring data from backups, repairing damaged systems or infrastructure, and verifying that systems are functioning correctly."
                    }
                ]
            },

            {
                "recovery-guide": [
                    {
                        id: 1,
                        text: "Conduct a post-incident review to identify areas for improvement in incident response procedures and incident prevention measures."
                    },
                    {
                        id: 2,
                        text: "Update incident response plans, policies, and procedures based on lessons learned."
                    },
                    {
                        id: 3,
                        text: "Implement security controls to prevent similar incidents from occurring in the future."
                    },
                    {
                        id: 4,
                        text: "Communicate the incident to stakeholders as appropriate, including regulatory bodies, customers, and partners."
                    },
                    {
                        id: 5,
                        text: "Report the incident to law enforcement as appropriate."
                    }
                ]
            }
        ]

}
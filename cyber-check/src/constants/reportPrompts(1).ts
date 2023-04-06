export const ReportPrompts =
{
    preprompts: [
        {
            question: "When did the incident occur?",
            options: [
                "Within the last hour",
                "Within the last day",
                "Within the last week",
                "More than a week ago"
            ]
        },
        {
            question: "How many systems are affected?",
            options: [
                "Less than 10",
                "Between 10 and 50",
                "Between 50 and 100",
                "More than 100"
            ]
        },
        {
            question: "What is the nature of the incident?",
            options: [
                "Unauthorized access or login attempts",
                "Data leakage or theft",
                "Malware or virus infection",
                "System outage or disruption"
            ]
        },
        {
            question: "Is there evidence of data compromise?",
            options: [
                "No evidence",
                "Suspicious activity but no data stolen",
                "Sensitive data stolen but not critical",
                "Critical data stolen"
            ]
        }
    ],
    incidentResponse: [
        {
            incidentType: "Phishing",
            incidentDetails: "sensitive information has been compromised (through clicking a link or downloading an attachment sent in a message or email)",
            prompts:
            {
                low_severity: [
                    {
                        id: 1,
                        title: "Change passwords",
                        description: "Change the password for any affected accounts immediately. If this password was also used for other online accounts, change the passwords for those accounts to something unique and strong."
                    },
                    {
                        id: 2,
                        title: "Contact fraud department",
                        description: "If the phishing attack compromised your company's account at a financial institution, contact the bank immediately to report the incident. Monitor for unauthorized transactions to the account. If a personal account was involved, contact the three major credit bureaus to enable fraud alerts."
                    },
                    {
                        id: 3,
                        title: "Notify appropriate personnel",
                        description: "Follow your company's incident response plan to ensure the appropriate personnel are aware of the incident."
                    },
                    {
                        id: 4,
                        title: "Deploy and maintain anti-virus software",
                        description: "If the phishing attack aims to install malware on your computer, up-to-date anti-virus software may help prevent the malware from installing."
                    },
                    {
                        id: 5,
                        title: "Utilize email filters",
                        description: "Many email services have configurable filters which can help prevent many phishing messages from ever reaching users' mailboxes."
                    }
                ],
                medium_severity: [
                    {
                        id: 6,
                        title: "Configure email security technologies",
                        description: "Email services can implement email authentication technologies that verify where messages originated and can reject messages that are spoofed. Check with your provider to see what security options are available."
                    },
                    {
                        id: 7,
                        title: "Enable anti-phishing capabilities",
                        description: "Email clients and web browsers often have anti-phishing capabilities. Enable available capabilities to help protect against phishing attacks."
                    },
                    {
                        id: 8,
                        title: "Notify affected parties",
                        description: "If personal data of others (e.g., customers, suppliers) was compromised, be sure to notify them. The compromised personal data could be used for identity theft. Check the website of your state's attorney general for information on data breach notification requirements."
                    },
                    {
                        id: 9,
                        title: "Implement multi-factor authentication (MFA)",
                        description: "MFA requires additional forms of authentication (e.g., a code texted to your phone number) in addition to your password. If MFA is enabled for your accounts, an attacker may still not be able to access your account even if you are tricked into providing your password."
                    }
                ],
                high_severity: [
                    {
                        id: 10,
                        title: "Isolate compromised systems",
                        description: "Isolate any compromised systems to prevent further damage."
                    },
                    {
                        id: 11,
                        title: "Preserve evidence",
                        description: "Preserve all evidence related to the incident to assist with investigation and potential legal action."
                    },
                    {
                        id: 12,
                        title: "Engage incident response team",
                        description: "Engage your organization's incident response team or a third-party incident response provider to help manage the incident and mitigate any damage."
                    },
                    {
                        id: 13,
                        title: "Conduct security audit",
                        description: "Conduct a thorough security audit to identify any vulnerabilities that may have led to the incident and to prevent similar incidents"

                    }
                ]

            }
        },
    ]
}

// Based on the answers to these questions, you can determine the severity level of the incident as follows:

// Low severity: No evidence of data compromise and either (1) the incident occurred more than a week ago or (2) less than 10 systems are affected and the incident is not a critical one.
// Medium severity: Suspicious activity but no data stolen or sensitive data stolen but not critical, and either (1) the incident occurred within the last week or (2) between 10 and 100 systems are affected.
// High severity: Critical data stolen, and either (1) the incident occurred within the last day or (2) more than 100 systems are affected.

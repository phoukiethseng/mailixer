const emailDomainRegex = /.+@(.+)\..+/;

export function getSubscriberESP(
    subscribers: { id: number; email: string }[]
): { id: string; count: number }[] {
    const espStats: Map<string, { id: string; count: number }> = new Map();
    subscribers.forEach((subscriber) => {
        // Extract domain part of email address
        const regexResult = emailDomainRegex.exec(subscriber.email);
        if (regexResult) {
            const domain = regexResult[1];
            if (espStats.has(domain)) {
                const val = espStats.get(domain);
                if (val?.count) {
                    val.count = val.count + 1;
                }
            } else {
                espStats.set(domain, { id: domain, count: 1 });
            }
        }
    });
    const result = [...espStats.values()];
    return result;
}

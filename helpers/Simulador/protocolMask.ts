export const protocolMask = (protocol: string): string => {
    protocol = protocol.replace(/\D/g, "");

    if (protocol.length > 17) {
        protocol = protocol.slice(0, 17);
    }

    return protocol;
};

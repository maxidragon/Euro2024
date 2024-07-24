const WCA_ORIGIN = "https://www.worldcubeassociation.org";

export const wcaApiRequest = (path: string) => {
    return fetch(`${WCA_ORIGIN}/api/v0/${path}`);
};

export const getWcif = async (competitionId: string) => {
    const response = await wcaApiRequest(`competitions/${competitionId}/wcif/public`);
    return await response.json();
};
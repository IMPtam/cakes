import httpService from "./httpService";
// import localStorageSevice from "./localStorageService";

const cakesEndPoint = "cakes/";

const cakesServices = {
    register: async (payload) => {
        const { data } = await httpService.post(cakesEndPoint, payload);

        return data;
    },
    get: async () => {
        const { data } = await httpService.get(cakesEndPoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            cakesEndPoint + payload._id,
            payload
        );
        return data;
    },
    patch: async (payload) => {
        const { data } = await httpService.patch(
            cakesEndPoint + payload._id,
            payload
        );
        return data;
    },
    removeCakes: async (cakeId) => {
        const { data } = await httpService.delete(cakesEndPoint + cakeId);
        return data;
    }
};
export default cakesServices;

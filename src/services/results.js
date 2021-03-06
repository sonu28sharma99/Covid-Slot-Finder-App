import {getSlotsByDistrict, getSlotsByPin} from '../api/results';

// const awaitedResults = async (pin, date, id) => {
//     const res1
// }

export const getResults = async (pin, date, id) => {
    if(pin.trim() !== '') {
        const distRes = await getSlotsByDistrict(id, date);
        const pinRes = await getSlotsByPin(pin, date);
        let filterDist = [];
        if(distRes && pinRes) {
            // console.log('1');
            if(distRes.length > 0) {
                filterDist = distRes.filter(session => {
                    return session.pincode !== pin;
                });
            }
            // console.log(filterDist);
            return [...pinRes, ...filterDist];
        }
    }
    else {
        const res = await getSlotsByDistrict(id, date);
        // console.log(res);
        return res;
    }
}
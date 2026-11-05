const sessionIdToUserMap = new Map();


function setUserfromMap(id ,user) {
    sessionIdToUserMap.set(id,user);
}
function getUserfromMap(id) {
    return sessionIdToUserMap.get(id);
}
module.exports = {
    getUserfromMap,
    setUserfromMap,
}
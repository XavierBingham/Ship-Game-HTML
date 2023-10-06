export default class EntityService {

    static EntityId = 0

    static GetEntityId(){
        const unclaimedId = this.EntityId;
        this.EntityId++;
        return unclaimedId;
    }

}
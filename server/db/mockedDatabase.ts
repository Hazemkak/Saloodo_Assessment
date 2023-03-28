import { v4 as uuidv4 } from 'uuid';

interface Parcel{
    senderId: string;
    parcelName: string;
    parcelId: string;
    bikerId: string | undefined;
    status: "pending" | "picked" | "delivered";
}

export interface Data{
    id: string;
    username: string;
    password: string;
    userType: "biker" | "sender";
    parcels:Parcel[];
}

class Database {
    private data:Data[]=[];

    public addUser(username:string, password:string, userType:"biker" | "sender"){
        const user = {
            id: uuidv4(),
            username,
            password,
            userType,
            parcels:[]
        }
        this.data.push(user);
        return user;
    }

    public addParcel(senderId:string, parcelName:string,  status:"pending" | "picked" | "delivered"="pending",bikerId:string | undefined=undefined){
        const parcel = {
            parcelId: uuidv4(),
            senderId,
            parcelName,
            bikerId,
            status
        }
        const user = this.data.find(user => user.id === senderId);
        if(user){
            user.parcels.push(parcel);
        }
        return parcel;
    }

    public findUser(username:string){
        return this.data.find(user => user.username === username);
    }

    public findUserById(id:string){
        return this.data.find(user => user.id === id);
    }

    public findParcelBySenderId(id:string){
        return this.data.find(user => user.parcels.find(parcel => parcel.senderId === id));
    }

    public findParcelByBikerId(id:string){
        return this.data.find(user => user.parcels.find(parcel => parcel.bikerId === id));
    }

    public findParcelByParcelName(parcelName:string){
        return this.data.find(user => user.parcels.find(parcel => parcel.parcelName === parcelName));
    }

    public findPendingParcel(){
        return this.data.find(user => user.parcels.find(parcel => parcel.status === "pending"));
    }

    public isIdABiker(id:string){
        const user = this.data.find(user => user.id === id);
        if(user){
            if(user.userType === "biker"){
                return true;
            }
        }
        return false;
    }

    public isIdASender(id:string){
        const user = this.data.find(user => user.id === id);
        if(user){
            if(user.userType === "sender"){
                return true;
            }
        }
        return false;
    }

    public updateParcelStatus(parcelId:string, status:"pending" | "picked" | "delivered"){
        const user = this.data.find(user => user.parcels.find(parcel => parcel.parcelId === parcelId));
        if(user){
            const parcel = user.parcels.find(parcel => parcel.parcelId === parcelId);
            if(parcel){
                parcel.status = status;
                return parcel;
            }
        }
        return null;
    }

    public updateParcelBidkerId(parcelId:string, bikerId:string){
        const user = this.data.find(user => user.parcels.find(parcel => parcel.parcelId === parcelId));
        if(user){
            const parcel = user.parcels.find(parcel => parcel.parcelId === parcelId);
            if(parcel){
                parcel.bikerId = bikerId;
                return parcel;
            }
        }
        return null;
    }

}

const database = new Database();

export default database;
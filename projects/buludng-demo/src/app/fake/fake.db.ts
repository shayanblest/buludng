import { RoleModel } from "../models/role.model";

export class FakeDB {
    static roles: RoleModel[] = [
        { id: '1', name: 'Programmer' },
        { id: '2', name: 'SuperAdmin' },
        { id: '3', name: 'Admin' },
        { id: '4', name: 'User' }
    ] 
}
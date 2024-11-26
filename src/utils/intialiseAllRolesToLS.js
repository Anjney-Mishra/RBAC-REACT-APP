const roles = {
    admin:["create","read","update","delete"],
    editor:["create","read","update"],
    viewer:["read"],
    guest:["read"],
}

export const initialiseAllRolesToLS = () => {
    const existingRoles = JSON.parse(localStorage.getItem("roles"));
    if(!existingRoles){
        localStorage.setItem("roles",JSON.stringify(roles));
    }
};
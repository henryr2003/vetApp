import {supabase} from "../supabaseClient"

export const useData = () => {

const getData = async () => {
    
    const {data, response, error} = await supabase.from("pets").select().order('id', {ascending: true});

    return {data, response, error};
}

const addData = async (name, type, breed) => {
    const {data, response, error} = await supabase.from("pets").insert({name: name, type: type, breed: breed, status: "Checked In"}).select().single();

    return {data, response, error}
}

const editData = async (id, info) => {
    const {data, response, error} = await supabase.from("pets").update(info).eq('id', id).select();

    return {data, response, error}
}

const deleteData = async (id) => {
    const {data, response, error} = await supabase.from("pets").delete().eq('id', id);

    return {data, response, error}
}
return {getData, addData, editData, deleteData}
}

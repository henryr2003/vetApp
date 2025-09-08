import {supabase} from "../supabaseClient"

export const useData = () => {

const getData = async () => {
    
    const {data, response, error} = await supabase.from("pets").select();

    return {data, response, error};
}

const addData = async (name, type, age) => {
    const {data, response, error} = await supabase.from("pets").insert({name: name, type: type, age: age});

    return {data, response, error}
}

const deleteData = async (id) => {
    const {data, response, error} = await supabase.from("pets").delete().eq('id', id);

    return {data, response, error}
}
return {getData, addData, deleteData}
}

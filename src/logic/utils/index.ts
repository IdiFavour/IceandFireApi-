import axios from "axios";

export async function httpGet(url:string) {
   try {
    const res = await axios.get(url,)
    return res.data
   } catch (e) {
    console.error(e);
   }
   
}
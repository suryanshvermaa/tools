import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {z} from "zod"

const server=new McpServer({
    name: 'Weather Data Fetcher',
    version: '1.0.0',
})

async function getWeatherByCity(city='') {
    if (city.toLocaleLowerCase()=='lakhimpur'){
        return {temp:'30C',forcast:'chances of high rain'}
    }
    if (city.toLocaleLowerCase()=='sitapur'){
        return {temp:'40C',forcast:'chances of high warm winds'}
    }
    return {temp:null,error:'unable to get the data'}
}

server.tool('getWeatherDataByCityName',{
    description: 'Get weather data for a city',
    inputSchema: z.object({
        city: z.string().describe('Name of the city to get weather for'),
    }),
},async({city})=>{
    return {content:[{type:"text",text: JSON.stringify(await getWeatherByCity(city))}]}
})


async function init() {
    const transport=new StdioServerTransport();
    await server.connect(transport);
}

init();
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {z} from "zod"

const server=new McpServer({
    name: 'Weather Data Fetcher',
    version: '1.0.0',
})

async function getWeatherByCity(city='') {
    if (city.toLowerCase()=='lakhimpur'){
        return {temp:'30C',forecast:'chances of high rain'}
    }
    if (city.toLowerCase()=='sitapur'){
        return {temp:'40C',forecast:'chances of high warm winds'}
    }
    return {temp:null,error:'unable to get the data'}
}


server.registerTool(
  "getWeatherDataByCityName",
  {
    title: "Get weather data by city name",
    description: "Return the latest weather data by city name",
    inputSchema: {
      city: z.string().describe("City name to fetch weather for"),
    }
  },
  async ({city}) => {
    console.error(`getWeatherDataByCityName called with city: ${city}`);
    return {
      content: [{ type: "text", text: JSON.stringify(await getWeatherByCity(city)) }]
    }
  }
);

async function init() {
    const transport=new StdioServerTransport();
    await server.connect(transport);
}

init();
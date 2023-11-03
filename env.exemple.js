const envs = {
    WEATHER_MAP_API_KEY: "",
    PEXELS_API_KEY: ""
}

process = { env: { } } 

Object.entries(envs).forEach(([key, value]) => process.env[key] = value)

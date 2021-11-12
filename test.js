const Riichi = require('./index')
const option = {}
option.sanma = false
option.tsumozon = false
const riichi = new Riichi('11111111111111z', option)

riichi.enableLocalYaku('八連荘')
riichi.enableLocalYaku('大車輪')
riichi.enableLocalYaku('大竹林')
riichi.enableLocalYaku('大数隣')
console.log(JSON.stringify(riichi.calc(), null, 2))
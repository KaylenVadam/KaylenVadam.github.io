const {query} = require('express');
const connection = require('./connection');

async function insert(parameters = {}) {
    const sql = "INSERT INTO halo_infinite_survey (id, ranked_or_casual, fav_weaponry, worst_weaponry, fav_ability, fav_boss, mouse_or_controller, fav_vehicle, image) VALUES ('AUTO', '" + parameters.playstyle +"', '" + parameters.FavoriteWeapon + "', '" + parameters.WorstWeapon + "', '" + parameters.favAbility + "', '" + parameters.favBoss + "', '" + parameters.gameInput + "', '" + parameters.favVehicle +"', '" + parameters.file + "')";
    return await connection.query(sql);
}


async function update(parameters = {}) {
  const sql = "UPDATE halo_infinite_survey SET ranked_or_casual='" + parameters.playstyle +"', fav_weaponry='" + parameters.FavoriteWeapon + "', worst_weaponry='" + parameters.WorstWeapon + "', fav_ability='" + parameters.favAbility + "', fav_boss='" + parameters.favBoss + "', mouse_or_controller='" + parameters.gameInput + "', fav_vehicle='" + parameters.favVehicle +"', image='" + parameters.file + "' WHERE id = '" + parameters.id + "'";
  return await connection.query(sql);
}


module.exports = {
    insert,
    update
}
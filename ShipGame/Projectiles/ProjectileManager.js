import ProjectileBuilder from "./ProjectileBuilder.js";
import Projectile from "./Projectile.js";

//data
let Projectiles = [];

//class
export default {

    Create:(ProjectileType, PosX, PosY, Rot) => {
        const ProjectileInfo = ProjectileBuilder[ProjectileType]();
        const NewProjectile = new Projectile(ProjectileInfo.Projectile, ProjectileInfo.Speed, PosX, PosY, Rot);
        Projectiles.push(NewProjectile);
    },

    Remove:(Projectile) => {
        
    },

    Update:(DeltaTime, CheckCollisions) => {

        for(projectile in Projectiles){
            projectile.Update(DeltaTime, CheckCollisions);
        }

    },

}

### Generate Migrations ###
npm run typeorm:migration:generate --n create-song

### Create Migrations ###
npm run typeorm:migration:create --n create-song

### Execute Migrations ###
npm run typeorm:migration:run

### Nest Create Module ###
nest generate module song

### Nest Create Controller ###
nest generate controller song --no-spec

### Nest Create Service ###
nest generate service song

### Start Project Dev Mod ###
npm run dev

### Start Test ###
npm run test

### EXECUTE NPM IN DOCKER CONTAINER Example ####
docker/npm run typeorm:migration:run
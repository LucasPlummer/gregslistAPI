import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class CarsService {



    async getAll(query) {
        const cars = dbContext.Cars.find(query).sort('make') //find all cars
        //NOTE                                                  .sort sorts by these values
        //NOTE                                                  .limit can be used to limit results
        return cars
    }

    async create(carData) {
        const newCar = await dbContext.Cars.create(carData)
        return newCar
    }

    async remove(carId) {
        //const car = await dbContext.Cars.findByIdAndRemove(carId) //This is ok this will delete it
        const car = await dbContext.Cars.findById(carId)
        if (!car) throw new BadRequest('no car at id:' + carId)
        //TODO get rid of car
        await car.remove() //another way to remove a document
        return `deleted ${car.make} ${car.model}`
    }

    async update(carId, carData) {
        // const updated = await dbContext.Cars.findByIdAndUpdate(carId, carData) //It works, and its alright, but it can be better
        const original = await dbContext.Cars.findById(carId)
        if (!original) throw new BadRequest('no car at id:' + carId)

        // NOTE if you dont want them to change it just dont allow it, dont give the option
        // original.make = carData.make ? carData.make : original.make
        // original.model = carData.model ? carData.model : original.model
        original.price = carData.price !== undefined ? carData.price : original.price
        original.imgUrl = carData.imgUrl ? carData.imgUrl : original.imgUrl
        original.year = carData.year !== undefined ? carData.year : original.year
        original.description = carData.description ? carData.description : original.description
        original.color = carData.color ? carData.color : original.color

        await original.save()
        return updated
    }
}

export const carsService = new CarsService()
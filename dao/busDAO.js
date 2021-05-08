let businesses;

export default class BusinessDAO {
  static async injectDB(conn){
    if(businesses){
      return
    }

    try {
      businesses = await conn.db(process.env.DATABASE_NAME).collection('businesses')
    } catch (err) {
      console.error(`Unable to establish a collection handle in busDAO: ${err}`,)
    }
  }

  static async getBusinesses({
    filters = null,
    page = 0,
    busPerPage = 10,
  } = {}) {
    let query
    if(filters){
      if("name" in filters){
        query = {$text: {$search: filters["name"]}}
      } else if("price" in filters){
        query = {"price": {$eq:filters["price"]}}
      } else if("category" in filters){
        query = {"category": {$eq:filters["category"]}}
    }
  }
    
    let cursor
    try {
      cursor = await businesses.find(query)
    } catch (error) {
      console.error(`Unable to issue find comand ${e}`, )
      return { businessesList:[], totalNumbersBusinesses:0 }
    }

    const displayCusor = cursor.limit(busPerPage).skip(busPerPage*page)

    try {
      const businessesList = await displayCusor.toArray()
      const totalNumbersBusinesses = await businesses.countDocuments(query)
      return { businessesList, totalNumbersBusinesses }
    } catch (err) {
      console.error(`Unable to convert cursor to array or problem counting documents, ${err}`,)
      return { businessesList:[], totalNumbersBusinesses:0 }
    }
}
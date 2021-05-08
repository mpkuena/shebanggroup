import BusDAO from '../dao/busDAO';

export default class BusController {
  static async apiGetBusinesses(req, res, next){
    const busPerPage = req.query.busPerPage? parseInt(req.query.busPerPage,10):20
    const page = req.query.page ? parseInt(req.query.page, 10):0

    let filters = {}
    if(req.query.category){
      filters.category = req.query.category
    } else if(req.query.price){
      filters.price = req.query.price
    } else if(req.query.name){
      filters.name = req.query.name
    }

    const { businessesList, totalNumberBusinesses} = await BusDAO.getBusinesses({ 
      filters,
      page,
      busPerPage,
    })

    let response = {
      businesses : businessesList,
      page : page,
      filters : filters,
      entries_per_page : busPerPage,
      total_result : totalNumberBusinesses,
    }
    res.json(response)
  }
}
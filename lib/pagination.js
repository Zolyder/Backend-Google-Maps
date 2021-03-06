'use strict'

class Pagination {
  /**
   * Group list of data in paginations
   *
   * @param {Array} listData
   * @param {Number} indexPage
   * @param {Number} quantityPerPage.
   * @returns {Object}.
   * @public
   * @method
   */

  static getIndexPage (listData, indexPage, quantityPerPage) {
    const dataPage = []
    const endPage = quantityPerPage * indexPage
    const startPage = endPage - quantityPerPage

    for (let i = startPage; i < endPage; i++) {
      if (i >= listData.length) {
        break
      }
      dataPage.push(listData[i])
    }

    const totalIndexPages = Math.ceil(listData.length / quantityPerPage)

    const result = {
      totalIndexPages,
      dataPage
    }

    return result
  }
}

module.exports = Pagination

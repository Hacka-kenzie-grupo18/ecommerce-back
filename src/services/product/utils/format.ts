export const format = (theme: string[], category:string, sizes: string[], colors: string[]) => {
    const themeFormated = theme.map(elem => {
        return elem.charAt(0).toUpperCase() + elem.slice(1).toLowerCase()
      })
    
      const categoryFormated = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    
      const sizesFormated = sizes.map(elem => {
        return elem.toUpperCase()
      })
    
      const colorsFormated = colors.map(elem => {
        return elem.charAt(0).toUpperCase() + elem.slice(1).toLowerCase()
      })


      return {
        themeFormated,
        categoryFormated,
        sizesFormated,
        colorsFormated
      }
}
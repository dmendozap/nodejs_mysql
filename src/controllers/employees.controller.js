import {pool} from '../db.js'

export const  getEmployees = async (req, res)=>{
    try{
      const [rows]= await pool.query('SELECT * FROM employee')
   res.json(rows)  
    }catch(error){
        return res.status(500).json({
            message: 'Error inesperado.'
        })
    }
   
}

export const  getEmployeeById = async (req, res)=>{
    

    try {
        console.log(req.params.id)
    const [rows] = await pool.query('SELECT * FROM employee where id=?', [req.params.id])
    if(rows.length <=0) return res.status(404).json({
        message: 'Id no encontrado.'
    })
    res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Error inesperado.'
        })
    }

 }

export const  createEmployees = async (req, res)=>{

    

    try {
        const {name, salary} = req.body
    const [rows] = await pool.query('INSERT INTO employee(name, salary) VALUES (?,?)', [name, salary])
    console.log(req.body)
    res.send({ rows })
    } catch (error) {
        return res.status(500).json({
            message: 'Error inesperado.'
        })
    }

  
}

export const  updateEmployees = async (req, res)=>{
   

   try {
    const {id} =  req.params
   const {name, salary} = req.body
   const [result] = await pool.query('UPDATE employee SET name = IFNULL(?,name), salary = IFNULL(?,salary) WHERE id = ?', [name, salary, id])
   if(result.affectedRows===0) return res.status(404).json({
    message:'Empleado no encontrado'
   })

   const [rows] = await pool.query('SELECT * FROM employee where id = ?', [id])
   res.json(rows[0])
   } catch (error) {

    return res.status(500).json({
        message: 'Error inesperado.'
    })
    
   }

}

export const  deleteEmployee = async(req, res)=>{

    

    try {
       console.log(req.params.id)
    const [result] = await pool.query('delete FROM employee where id=?', [req.params.id])
    if(result.affectedRows <=0) return res.status(404).json({
        message: 'Id no encontrado.'
    })
    res.sendStatus(204) 
    } catch (error) {

        return res.status(500).json({
            message: 'Error inesperado.'
        })
        
    }
    
}
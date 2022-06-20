const router = require('express').Router();
const {PrismaClient}=require('@prisma/client')

const prisma=new PrismaClient()

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

// get all products
router.get('/products', async (req, res, next) => {
 try{
  const products=await prisma.product.findMany({
    include: {category: 'products'}
  })
  res.json(products);
 }catch(err){
  next(err)
 }
});

// get a product by id

router.get('/products/:id', async (req, res, next) => {
 try {
  const {id}=req.params
  const product=await prisma.product.findUnique({
    where:{id: Number(id)},include: {category:true}
    
  })
  // console.log(product.)
  res.json(product)
 } catch (error) {
    next(error)
 }
});

//create new product
router.post('/products', async (req, res, next) => {
try {
  const data=req.body
  const product=await prisma.product.create({
    data:data
  })

  res.json(product);
} catch (error) {
  next(error)
}
});

// delete product
router.delete('/products/:id', async (req, res, next) => {
  const {id}=req.params
  const deletedProduct=await prisma.product.delete({
    where:{id: Number(id)},
  })

  res.json(deletedProduct)
});


// update product
router.patch('/products/:id', async (req, res, next) => {

  try {
    const {id}=req.params
  const patchedProduct=await prisma.product.update({
    where:{id: Number(id)},
    data:req.body,
    include:{
      category : true
    }
  })
  res.json(patchedProduct)
  } catch (error) {
    next(error)
  }
  
});
module.exports = router;

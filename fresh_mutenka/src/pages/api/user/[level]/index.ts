export default function hundler(req, res) {
    const {level}=req.query
    
    res.status(200).json({number:"30",message: "hello"})
}
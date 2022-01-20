import prisma from '../../lib/prisma'

export default async function (req, res) {
    if (!(await validateCaptcha(req.body['g-recaptcha-response']))) {
        console.log('Gcheck running');
        
        return res.redirect(`/captcha`)
    }
    delete req.body['g-recaptcha-response']
    const { email, company, name, position } = req.body;
    console.log('API running');
    try {
        const beta = await prisma.beta.create({
            data: {
                company,
                mcnumber:parseInt(req.body.mcnumber),
                usdot:parseInt(req.body.usdot),
                phone:parseInt(req.body.phone),
                email,
                name,
                position,
            }
        })

        res.status(201)
        res.json({beta})
    } catch (e) {
        console.log(e)
        res.status(500)
        res.json({error: "Ошибка при создании заявки."})
    } finally {
        await prisma.$disconnect()
    }

}

const validateCaptcha = (response_key) => {
    return new Promise((resolve, reject) => {
        const secret_key = process.env.RECAPTCHA_SECRET

        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`

        fetch(url, {
        method: 'post'
        })
            .then((response) => response.json())
            .then((google_response) => {
                if (google_response.success == true) {
                    resolve(true)
                } else {
                    resolve(false)
                }
        })
        .catch((err) => {
            console.log(err)
            resolve(false)
        })
    })
}


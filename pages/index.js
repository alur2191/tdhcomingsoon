import React,{useState} from "react";
import classes from './index.module.css'
import ReCAPTCHA from "react-google-recaptcha";
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from "react-hook-form";
import Head from 'next/head'


function Home() {
    const [
        isSuccessfullySubmitted,
        setIsSuccessfullySubmitted,
    ] = useState(false);
    const { register,  formState: { errors, isSubmitted }, handleSubmit, reset } = useForm();
    let agreement = false
    
    const submitData = async ({company, mcnumber, usdot, phone, email, name, position}) => {
        if (grecaptcha.getResponse() === '') {
            alert("Пожалуйста пройдите проверку reCAPTCHA для отправки анкеты")
            return
        }
        if (!agreement) {
            alert("Вы должны согласится с условиями пользовательского соглашения и c политика конфиденциальности")
            return
        }
        try {
            const body = { company, mcnumber, usdot, phone, email, name, position };
            const response = await fetch("/api/send/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            setIsSuccessfullySubmitted(response.ok)
            reset()
            grecaptcha.reset();
            setTimeout(()=>{setIsSuccessfullySubmitted(false)},10000)
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className={classes.main}>
            <Head>
                <title>TruckDriver.help - Работа в траковых компаниях для CDL водителей</title>
            </Head>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                    src="/logo.png"
                    alt="TruckDriver.help - Поиск работы для водителей траков с правами CDL"
                    width={180}
                    height={72}

                />
            </div>
            <div className={classes.description}>
                <p>TruckDriver.help предоставляем сервис по поиску работы водителем, а также размещению вакансий на работу. Разработка ведется с целью облегчения задачи поиска работы в индустрии, а также предоставлении эффективных услуг по размещению объявлений. Сервис разрабатывается с применением новейших технологий с помощью которых мы создаем уникальные поисковые фильтры предоставляющие возможность сортировать вакансии по различным критериям.</p>
                <p>Запуск бета-тестирования сервиса планируется на февраль. Мы приглашаем траковые компании принять участие в бета-тестировании. На период бета-теста, сервис будет предоставлен бесплатно. <strong>Компании зарегистрированные до запуска бета версии, получат купоны на скидку после окончания бета тестирования.</strong></p>
                <p>Компания желающая принять участия должна заполнить форму с информацией о себе. Наша команда рассмотрит заявление для одобрения. Мы свяжемся с вами до запуска, зарегистрируем аккаунт на платформе и отправим инструкцию по размещению объявлений.</p>
            </div>
            <form className={classes.form} onSubmit={handleSubmit(submitData)}>

                <h3>Компания</h3>
                <div className="form-row">
                    <div>
                        <label htmlFor="name"><span className="required">*</span>Название Компании</label>
                        <input className="input-md" type="text" placeholder="Название Компании" id="name" {...register("company", {  required: {value:true,message:'Необходимо ввести название компании'} })} />
                        {errors.company && <span className="alert">{errors.company.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="mc-number"><span className="required">*</span>MC Номер</label>
                        <input className="input-md" type="number" placeholder="########" id="mc-number" {...register('mcnumber', {
                            required: {value:true,message:'Необходимо ввести MC номер'},
                            minLength: {
                                value: 5,
                                message: "От 5-цифр"
                            },
                            maxLength: {
                                value: 7,
                                message: "До 7-цифр"
                            }
                        })} />
                        {errors.mcnumber && <span className="alert">{errors.mcnumber.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="usdot"><span className="required">*</span>USDOT</label>
                        <input className="input-md" type="number" placeholder="########" id="usdot" {...register('usdot', {
                            required: {value:true,message:'Необходимо ввести номер USDOT'},
                            minLength: {
                                value: 6,
                                message: "От 6-цифр"
                            },
                            maxLength: {
                                value: 10,
                                message: "До 10-цифр"
                            }
                        })} />
                        
                        {errors.usdot && <span className="alert">{errors.usdot.message}</span>}
                    </div>
                </div>
                <h3>Контактная Информация</h3>
                <div className="form-row">
                    <div>
                        <label htmlFor="phone"><span className="required">*</span>Телефон</label>
                        <input type="number" placeholder="Телефон" id="phone"  {...register('phone', {
                            required: {value:true,message:'Необходимо ввести номер телефона'},
                            minLength: {
                                value: 10,
                                message: "10 цифр (Номер США)"
                            },
                            maxLength: {
                                value: 10,
                                message: "10 цифр (Номер США)"
                            }
                        })} />
                        {errors.phone && <span className="alert">{errors.phone.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="email"><span className="required">*</span>Email</label>
                        <input type="email" placeholder="Email" id="email" {...register("email", {  required: {value:true,message:'Необходимо ввести email'},pattern:{
                            value:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message:'Введенный email неверный'
                        }  })} />
                        {errors.email && <span className="alert">{errors.email.message}</span>}

                    </div>
                    <div>
                        <label htmlFor="fullname"><span className="required">*</span>Полное Имя</label>
                        <input type="text" placeholder="Имя" id="fullname" {...register("name", { required: {value:true,message:'Необходимо ввести полное имя'}})} />
                        {errors.name && <span className="alert">{errors.name.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="position"><span className="required">*</span>Должность</label>
                        <input type="text" placeholder="Должность" id="position" {...register("position", {  required: {value:true,message:'Необходимо ввести должноть в компании'} })} />
                        {errors.position && <span className="alert">{errors.position.message}</span>}
                    </div>
                </div>
                <div style={{ display: 'flex', margin: "20px 0" }}>
                    <input type="checkbox" id="agreement" name="agreement" onChange={() => {
                        agreement = !agreement
                        console.log(agreement);
                    }}></input>
                    <label htmlFor="agreement">Я прочитал и согласен с <Link href={{ pathname: `/help/terms` }}><a target="_blank">условиями пользовательского соглашения</a></Link>, и c <Link href={{ pathname: `/help/privacy` }}><a target="_blank">политика конфиденциальности</a></Link></label>
                </div>
                <div style={{display:'flex', gap: 10, flexDirection: 'column', alignItems:'flex-start'}}>
                {isSuccessfullySubmitted&&<span className="success">Спасибо, Ваша заявка отправлена! Мы свяжемся с Вами в ближайшее время.</span>}
                <ReCAPTCHA
                        size="normal"
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    />
                
                    <div><input type="submit" value="Отправить" /></div>
                    
                </div>
            </form>
        </div>
    );
}

export default Home;

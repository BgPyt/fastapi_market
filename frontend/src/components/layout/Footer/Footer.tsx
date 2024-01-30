import React from 'react'
import {svgEmail, svgMasterCard, svgPhone, svgTelegram, svgTime, svgVisa, svgWhatsApp } from '@assets/svg/svg'
import style from '@components/layout/Footer/footer.module.css'
import { Link } from 'react-router-dom'
import Image from '@components/Image/Image'
import { svgWave } from '@assets/svg/svg';

const Footer = () => {
  return (
    <div>
    {svgWave}
    <div className={style.footer}>
    <div className={style.footer_block}>
        <div className={style.footer_top}>
                <div className={style.wraper}>
                    <div className={style.footer_main_block}>
                    <div className={style.footer_menu_links_desktop}>
                        <div className={style.desktop_block}>
                            <div className={[style.company_title, style.title_list].join(' ')}>Компания</div>
                            <ul className={style.desktop_ul}>
                                <li><Link to="">О компании</Link></li>
                                <li><Link to="">Бренды</Link></li>
                                <li><Link to="">Контакты</Link></li>
                                <li><Link to="">Сертификаты</Link></li>
                                <li><Link to="">Гарантии</Link></li>
                                <li><Link to="">Вакансии</Link></li>
                                <li><Link to="">Магазины</Link></li>
                                <li><Link to="">Новости</Link></li>
                            </ul>
                        </div>
                        <div className={style.desktop_block}>
                            <div className={[style.buyer_title, style.title_list].join(' ')}>Покупателям</div>
                            <ul className={style.desktop_ul}>
                                <li><Link to="">Как оформить заказ</Link></li>
                                <li><Link to="">Способы оплаты</Link></li>
                                <li><Link to="">Кредиты</Link></li>
                                <li><Link to="">Доставка</Link></li>
                                <li><Link to="">Статус заказа</Link></li>
                                <li><Link to="">Обмен, возврат, гарантия</Link></li>
                                <li><Link to="">Монтаж</Link></li>
                                <li><Link to="">Политика обработки персональных данных</Link></li>
                            </ul>
                        </div>
                        <div className={style.desktop_block}>
                            <div className={[style.buyer_title, style.title_list].join(' ')}>Сотрудничество</div>
                            <ul className={style.desktop_ul}>
                                <li><Link to="">Юридическим лицам</Link></li>
                                <li><Link to="">Физическим лицам</Link></li>
                                <li><Link to="">Отправить коммерческое предложение</Link></li>
                                <li><Link to="">Поставщикам</Link></li>
                                <li><Link to="">Арендатором</Link></li>
                            </ul>
                        </div>
                        <div className={style.desktop_block}>
                            <div className={style.desktop_messengers_title}>Мессенджеры</div>
                            <div className={style.desktop_messengers}>
                                <Link className={style.messengers_link} to="">
                                    {svgTelegram}</Link>
                                <Link to="">
                                    {svgWhatsApp}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={style.footer_top_contacts_block}>
                    <div className={style.footer_top_contacts_content}>
                        <div className={[style.contacts_tel, style.contacts].join(' ')}>
                             <Link className={style.contacts_tel_link} to=''>
                                8 (800) 755_88_88
                            </Link>
                            <Link className={style.contacts_tel_link_text} to=''>
                                {svgPhone}
                                <span>Заказ по телефону</span>
                            </Link>
                        </div>
                        <div className={[style.contacts_email, style.contacts].join(' ')}>
                            <Link className={style.contacts_email_link_title} to=''>
                                Наш email
                            </Link>
                            <Link className={style.contacts_email_link_text} to=''>
                                {svgEmail}
                                str42@str42.ru
                            </Link>
                        </div>
                        <div className={[style.contacts_time, style.contacts].join(' ')}>
                                {svgTime}
                                <span>Информация о ценах и наличии товара обновлена по Кемеровскому времени:<span className={style.time_text}>{new Date().toLocaleString()}</span></span>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
        </div>
        <div className={style.footer_bottom}>
            <div className={style.wraper}>
                <div className={style.footer_bottom_block}>
                    <div className={style.footer_copyright}>
                        <p>Если у товара отсутствует цена, это означает что он либо временно закончился, либо зарезервирован, либо больше не производится. Возможность поставки и стоимость такого товара уточняйте у менеджеров по телефону или с помощью формы обратной связи.</p>
                        <p>Любая информация на сайте носит информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями Статьи 437 (2) Гражданского кодекса РФ. Информация о товарах, их технических свойствах и характеристиках, ценах является предложением СанТехРесурса делать оферты. Информация о технических характеристиках товаров, указанная на сайте, может быть изменена производителем в одностороннем порядке. Изображения товаров на фотографиях, представленных в каталоге на сайте, могут отличаться от оригиналов. Информация о цене товара, указанная в каталоге на сайте, может отличаться от фактической к моменту оформления заказа на соответствующий товар. Подтверждением цены заказанного товара является сообщение СанТехРесурса о цене такого товара.</p>
                    </div>
                    <div className={style.footer_content_bottom}>
                        <div className={style.footer_payments}>
                            <div className={style.payments_title}>Система оплаты</div>
                            <div className={style.payments_svg}>
                                {svgMasterCard}
                                {svgVisa}
                            </div>
                        </div>
                        <Link to=''><Image src={process.env.REACT_APP_API_STORAGE + "logo-small.jpg"}/></Link>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</div>
</div>
  )
}

export default Footer

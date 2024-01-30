from datetime import datetime
import enum
from typing import List, Dict
from sqlalchemy import Integer, String, ForeignKey, JSON, TIMESTAMP, Boolean, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy_fields.types import ImageType
from sqlalchemy_fields.storages import FileSystemStorage
from src.database import Base


class SelectCity(enum.Enum):
    kem = "Кемерово"
    nov = "Новокузнецк"
    len = "Ленинск-Кузнецкий"
    bel = "Белово"


class SelectType(enum.Enum):
    Sale = 'Sale',
    New = 'New',
    BestSeller = 'Best Seller'


class Storage(Base):
    __tablename__ = "storage"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    address: Mapped[int] = mapped_column(ForeignKey("address.id"))
    product: Mapped[int] = mapped_column(ForeignKey("product.id"))
    quantity: Mapped[int] = mapped_column(Integer, nullable=True)
    address_relationship = relationship("Address", back_populates="product", lazy="joined")
    product_relationship = relationship("Product", back_populates="address")



class Product(Base):
    __tablename__ = "product"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False, index=True, unique=True)
    characteristic = mapped_column(JSON, nullable=False)
    price: Mapped[int] = mapped_column(Integer, nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=True)
    image = mapped_column(ImageType(storage=FileSystemStorage(path='./storage/image_product')), unique=True)
    subcategories_id = mapped_column(Integer, ForeignKey("subcategories.id"))
    subcategories = relationship('Subcategories', back_populates='product')
    type = mapped_column(Enum(SelectType))
    address = relationship("Storage")

    def __str__(self):
        return self.name


class Category(Base):
    __tablename__ = "category"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False, index=True, unique=True)
    subcategories = relationship('Subcategories')
    slug: Mapped[str] = mapped_column(String, default='', nullable=True)

    def __str__(self):
        return self.name


class Subcategories(Base):
    __tablename__ = "subcategories"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False, index=True, unique=True)
    category_id: Mapped[int] = mapped_column(Integer, ForeignKey('category.id'), nullable=True)
    subcategories_id: Mapped[int] = mapped_column(Integer, ForeignKey('subcategories.id', name='fk_subcategories_id'), nullable=True)
    subcategories_relationship = relationship('Subcategories', remote_side=[id])
    product = relationship('Product')
    category = relationship('Category', back_populates='subcategories', lazy='joined')
    slug: Mapped[str] = mapped_column(String, default='', nullable=True)

    def __str__(self):
        return self.name


class Address(Base):
    __tablename__ = "address"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String, index=True, unique=True, nullable=False)
    city = mapped_column(Enum(SelectCity))
    product = relationship("Storage")

    def __str__(self):
        return self.title


class Order(Base):
    __tablename__ = "order"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"))
    user = relationship('User', back_populates='orders')
    list_products: Mapped[List[Dict]] = mapped_column(JSON, nullable=False)
    registration_date: Mapped[str] = mapped_column(TIMESTAMP, default=datetime.utcnow)
    final_price: Mapped[int] = mapped_column(Integer, nullable=False)
    buy_date: Mapped[str] = mapped_column(TIMESTAMP, default='null')
    slug: Mapped[str] = mapped_column(String, default='', nullable=True)




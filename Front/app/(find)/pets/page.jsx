'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfileCard from "@comps/profileCard";
import ModalNewPet from "@/app/components/pets/modalNewPet";
import { useAuth } from '@comps/authContext'

export default function FindPet() {
  const [token, setToken] = useAuth();
  const [getCards, setCards] = useState([]);

  const router = useRouter();

  // Busca as informações dos cards no back
  function getAllCards() {
    const url = "http://127.0.0.1:8000/pets/";

    const data = {
      method: 'GET'
    };

    fetch(url, data)
      .then((res) => res.json())
      .then((data) => {
        createCards(data);
      });
  }

  function createCards(value) {
    if (value) {
      setCards(
        value.map((data, index) => (
          <ProfileCard key={index} data={data}></ProfileCard>
        )));
    }
  }

  useEffect(() => {
    getAllCards()
  }, [])

  return (
    <div className='page'>
      <div className='cards'>
        {getCards}
      </div>

    <ModalNewPet update={getAllCards}></ModalNewPet>
    </div>
  )
}
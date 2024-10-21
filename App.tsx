import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Clock } from 'lucide-react'

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate.getTime() - now

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className="countdown flex justify-around mt-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="countdown-item text-center">
          <span className="countdown-value text-4xl font-bold text-primary">{value}</span>
          <p className="capitalize">{unit}</p>
        </div>
      ))}
    </div>
  )
}

const LocationCard = ({ title, address, time, imageSrc, mapSrc }) => (
  <Card className="location">
    <CardHeader>
      <CardTitle className="text-2xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{address}</p>
      <p className="flex items-center mt-2">
        <Clock className="mr-2" size={16} />
        <strong>{time}</strong>
      </p>
      <img src={imageSrc} alt={title} className="w-full h-48 object-cover rounded-md mt-4" />
      <iframe
        src={mapSrc}
        className="w-full h-48 border-none rounded-md mt-4"
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </CardContent>
  </Card>
)

const RSVPForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: '',
    guests: '',
    specialRequests: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Gracias por tu RSVP!\n\n' + JSON.stringify(formData, null, 2))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        name="name"
        placeholder="Nombre completo"
        required
        onChange={handleChange}
      />
      <Input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        required
        onChange={handleChange}
      />
      <Select name="attending" onValueChange={(value) => handleChange({ target: { name: 'attending', value } })}>
        <SelectTrigger>
          <SelectValue placeholder="¿Asistirás?" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="yes">Sí, asistiré</SelectItem>
          <SelectItem value="no">No puedo asistir</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="number"
        name="guests"
        placeholder="Número de invitados"
        min="1"
        max="5"
        onChange={handleChange}
      />
      <Textarea
        name="specialRequests"
        placeholder="Solicitudes especiales (requisitos dietéticos, etc.)"
        onChange={handleChange}
      />
      <Button type="submit" className="w-full">Enviar RSVP</Button>
    </form>
  )
}

const PaymentForm = () => {
  const [giftOption, setGiftOption] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Gracias por tu selección de regalo!\n\nOpción elegida: ${giftOption}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select name="gift-option" onValueChange={setGiftOption} required>
        <SelectTrigger>
          <SelectValue placeholder="Elige tu opción de regalo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="dinner">Solo cena - $20 USD</SelectItem>
          <SelectItem value="disney">Cena + Entrada a Disney - $90 USD</SelectItem>
          <SelectItem value="museum">Cena + Entrada al museo - $40 USD</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" className="w-full">Proceder al Pago</Button>
    </form>
  )
}

export default function WeddingInvitation() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{
      backgroundImage: "url('img/background.jpg')",
      backgroundRepeat: 'repeat',
      backgroundSize: '300px'
    }}>
      <div className="container mx-auto p-4 bg-background/90 shadow-lg">
        <header className="text-center py-12 bg-secondary rounded-lg mb-8">
          <h1 className="text-5xl font-bold text-primary mb-2">Fran & Michu</h1>
          <p className="text-2xl">¡Nos casamos!</p>
        </header>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Guarda la Fecha</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-xl mb-4">1 de marzo de 2025</p>
            <CountdownTimer targetDate={new Date('2025-03-01T10:00:00')} />
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <LocationCard
            title="Ceremonia"
            address="Iglesia La Salle Florida, Pres. Hipólito Yrigoyen 2599, B1602DLD Florida, Provincia de Buenos Aires"
            time="10:00 AM"
            imageSrc="img/iglesia.jpg"
            mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3287.0372267919183!2d-58.49924920000003!3d-34.5272848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb12e78ad9d01%3A0xf32e159365b3e8eb!2sInstituto%20La%20Salle%20Florida!5e0!3m2!1ses-419!2sar!4v1729550960490!5m2!1ses-419!2sar"
          />
          <LocationCard
            title="Salón"
            address="Quincho Bayer, Julián Segundo Agüero 2530, B1605 Munro, Provincia de Buenos Aires"
            time="1:00 PM"
            imageSrc="img/salon.jpg"
            mapSrc="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d422.9309133065179!2d-58.51388887905196!3d-34.52500637347731!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb1004146ce3b%3A0xae0d000ed4e2a9ff!2sQuincho%20Bayer!5e0!3m2!1ses-419!2sar!4v1729550835382!5m2!1ses-419!2sar"
          />
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl text-center">RSVP</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-4">Por favor, confirma tu asistencia:</p>
            <RSVPForm />
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Opciones de Regalo y Pago</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-4">Por favor, elige tu opción de regalo y realiza el pago correspondiente:</p>
            <PaymentForm />
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Detalles de Pago</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>Por favor, realiza la transferencia del monto correspondiente a tu selección:</p>
            <p><strong>Nombre de la cuenta:</strong> Boda de Fran & Michu</p>
            <p><strong>Número de cuenta:</strong> 1234567890</p>
            <p><strong>Banco:</strong> Banco de Bodas</p>
            <p><strong>Código SWIFT:</strong> WEDDABC123</p>
          </CardContent>
        </Card>

        <footer className="text-center py-8 bg-secondary rounded-lg mt-8">
          <p>¡Esperamos celebrar con ustedes!</p>
          <p className="font-bold">Fran & Michu</p>
        </footer>
      </div>
    </div>
  )
}
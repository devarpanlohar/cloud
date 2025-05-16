export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  if (!lat || !lng) {
    return new Response(JSON.stringify({ error: 'Missing coordinates' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  try {
    // Using OpenStreetMap Nominatim (free service)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    )

    if (!response.ok) {
      throw new Error('Failed to fetch location data')
    }

    const data = await response.json()

    // Extract address components
    const address = data.address || {}
    const locationName = [
      address.city || address.town || address.village,
      address.state,
      address.country,
    ]
      .filter(Boolean)
      .join(', ')

    return new Response(
      JSON.stringify({
        address: locationName || `${lat},${lng}`,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to reverse geocode',
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}

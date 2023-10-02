import { Container, Flex, Slider, Stack, Text, TextInput } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useAdPurchaseFormContext } from "../form-context";
import { useMapStyles } from "../styles";

function AreaCenter() {
  const { getInputProps } = useAdPurchaseFormContext();

  return (
    <TextInput
      py={"md"}
      label="Search by zip code"
      size="md"
      {...getInputProps("target_area_center")}
    />
  );
}

function AreaSlider() {
  const { getInputProps } = useAdPurchaseFormContext();
  const marks = [
    { value: 5, label: "5 mi" },
    { value: 75, label: "75 mi" },
    { value: 150, label: "150 mi" },
  ];
  return (
    <Stack py="sm">
      <Text>Radius</Text>
      <Slider
        label={(value) => `${value} miles`}
        min={5}
        max={150}
        marks={marks}
        {...getInputProps("target_area_radius")}
      />
    </Stack>
  );
}

export default function MapInput() {
  const { getInputProps } = useAdPurchaseFormContext();
  const areaCenter: string = getInputProps("target_area_center").value;
  const userRadius: number = getInputProps("target_area_radius").value;

  const { classes } = useMapStyles();

  const ref = useRef<HTMLDivElement>(null);
  const [mapObj, setMapObj] = useState<google.maps.Map>();
  const [areaCircle, setAreaCircle] = useState<google.maps.Circle>();
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    const fetchLatLng = async () => {
      try {
        const zipRegex = /^\d{5}$/m;
        if (!zipRegex.test(areaCenter)) {
          return;
        }
        setIsFetching(true);
        const request = {
          address: areaCenter,
        };
        const geocoder = new window.google.maps.Geocoder();
        const geocodeRes = await geocoder.geocode(request);
        if (geocodeRes.results.length === 0) {
          throw new Error("no results found");
        }
        mapObj?.setCenter(geocodeRes.results[0].geometry.location);

        areaCircle?.setCenter(geocodeRes.results[0].geometry.location);
      } catch (err: any) {
        console.log(err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchLatLng();
  }, [areaCenter]);

  useEffect(() => {
    if (ref.current === null) {
      return;
    }
    const map = new window.google.maps.Map(ref.current, {
      center: { lat: 42.64676, lng: -73.75749 },
      zoom: 7.5,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
    });

    const radiusMeters = userRadius * 1609;
    const targetCircle = new window.google.maps.Circle({
      strokeColor: "#FF5A5F",
      fillColor: "#104059",
      fillOpacity: 0.3,
      strokeOpacity: 0.8,
      strokeWeight: 5,
      map,
      center: { lat: 42.64676, lng: -73.75749 },
      radius: radiusMeters,
    });
    setMapObj(map);
    setAreaCircle(targetCircle);
  }, []);

  useEffect(() => {
    const meters = userRadius * 1609;
    areaCircle?.setRadius(meters);
    let zoomLevel;
    if (userRadius < 50) {
      zoomLevel = 7.5 - (userRadius - 50) * 0.06;
    } else {
      zoomLevel = 7.5 - (userRadius - 50) / 75;
    }
    mapObj?.setZoom(zoomLevel);
  }, [userRadius]);

  return (
    <Flex direction={"column"}>
      <Container
        className={classes.mapContainer}
        size={"xl"}
        ref={ref}
        id="map"
      />
      <AreaCenter />
      <AreaSlider />
    </Flex>
  );
}

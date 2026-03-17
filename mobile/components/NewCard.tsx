import { AspectRatio, Box, Center, Heading, HStack, Image, Stack, Text } from "native-base"
import React from "react"

const NewCard = () =>
{
	return <Box alignItems="center">
		<Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
			borderColor: "coolGray.600",
			backgroundColor: "gray.700"
		}} _web={{
			shadow: 2,
			borderWidth: 0
		}} _light={{
			backgroundColor: "gray.50"
		}}>
			<Box>
				<AspectRatio w="100%" ratio={16 / 9}>
					<Image source={{
						uri: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800"
					}} alt="Solar panels in Burkina Faso" />
				</AspectRatio>
				<Center bg="orange.500" _dark={{
					bg: "orange.400"
				}} _text={{
					color: "warmGray.50",
					fontWeight: "700",
					fontSize: "xs"
				}} position="absolute" bottom="0" px="3" py="1.5">
					SOLAR
				</Center>
			</Box>
			<Stack p="4" space={3}>
				<Stack space={2}>
					<Heading size="md" ml="-1">
						FasoLara Solar Energy
					</Heading>
					<Text fontSize="xs" _light={{
						color: "orange.500"
					}} _dark={{
						color: "orange.400"
					}} fontWeight="500" ml="-0.5" mt="-1">
						Powering Burkina Faso with clean energy.
					</Text>
				</Stack>
				<Text fontWeight="400">
					FasoLara brings affordable solar energy solutions to communities
					across Burkina Faso, improving lives through sustainable power.
				</Text>
				<HStack alignItems="center" space={4} justifyContent="space-between">
					<HStack alignItems="center">
						<Text color="coolGray.600" _dark={{
							color: "warmGray.200"
						}} fontWeight="400">
							6 mins ago
						</Text>
					</HStack>
				</HStack>
			</Stack>
		</Box>
	</Box>
}

export default NewCard

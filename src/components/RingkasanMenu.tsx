import { Box, Button, Flex, Text } from "@chakra-ui/react";

export default function RingkasanMenu() {
  
  return (
    <Flex borderTop="1px" mt="15px" alignItems="center">
      <Box>
        <Text fontWeight="bold" fontSize="lg">
          Ringkasan
        </Text>
        <Text>1 makanan dan 1 minuman</Text>
        <Text>Total: Rp 10.000</Text>
      </Box>
      <Box marginLeft="auto">
          <Button size="sm" color="white" bg="#219181" borderRadius="5px">Pesan Sekarang</Button>
      </Box>
    </Flex>
  );
}
